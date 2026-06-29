'use client';
import {
  ArrowUpDownIcon,
  Cancel01Icon,
  ChevronDownIcon,
  SearchIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PostCard, type PostCardData } from '@/components/post/PostCard';
import { PostCardSkeleton } from '@/components/post/PostCardSkeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BASE_PATH } from '@/config/site';
import { cn } from '@/lib/utils';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

interface SearchFeedProps {
  categories: { slug: string; title: string }[];
  tags: { slug: string; title: string }[];
  authors: { slug: string; name: string }[];
}

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'reading-time-asc', label: 'Reading Time (Low to High)' },
  { value: 'reading-time-desc', label: 'Reading Time (High to Low)' },
  { value: 'alphabetical', label: 'A to Z' },
  { value: 'alphabetical-desc', label: 'Z to A' },
] as const;

function SearchFeedContent({ categories, tags, authors }: SearchFeedProps) {
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('latest');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [tagOpen, setTagOpen] = useState(false);
  const [authorOpen, setAuthorOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [tagSearch, setTagSearch] = useState('');
  const [authorSearch, setAuthorSearch] = useState('');
  const parentRef = useRef<HTMLDivElement>(null);
  const [pagefindResults, setPagefindResults] = useState<any[] | null>(null);
  const [pagefindLoading, setPagefindLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q') || '';
      setQuery(q);
      const cats = params.get('categories');
      if (cats) setSelectedCategories(cats.split(',').filter(Boolean));
      const tg = params.get('tags');
      if (tg) setSelectedTags(tg.split(',').filter(Boolean));
      const au = params.get('author');
      if (au) setSelectedAuthor(au);
      const sb = params.get('sort');
      if (sb) setSortBy(sb);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (query) {
        url.searchParams.set('q', query);
      } else {
        url.searchParams.delete('q');
      }
      if (selectedCategories.length > 0) {
        url.searchParams.set('categories', selectedCategories.join(','));
      } else {
        url.searchParams.delete('categories');
      }
      if (selectedTags.length > 0) {
        url.searchParams.set('tags', selectedTags.join(','));
      } else {
        url.searchParams.delete('tags');
      }
      if (selectedAuthor !== 'all') {
        url.searchParams.set('author', selectedAuthor);
      } else {
        url.searchParams.delete('author');
      }
      if (sortBy !== 'latest') {
        url.searchParams.set('sort', sortBy);
      } else {
        url.searchParams.delete('sort');
      }
      window.history.replaceState({}, '', url.toString());
    }
  }, [query, selectedCategories, selectedTags, selectedAuthor, sortBy]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const base = 'Search | Awesome';
      document.title = query ? `Search: ${query} | Awesome` : base;
    }
  }, [query]);

  useEffect(() => {
    if (!query.trim()) {
      setPagefindResults(null);
      return;
    }

    const performSearch = async () => {
      setPagefindLoading(true);
      try {
        // @ts-ignore
        const pagefind = await import(/* @vite-ignore */ `${import.meta.env.BASE_URL}pagefind/pagefind.js`);
        await pagefind.init();
        const search = await pagefind.search(query);
        const results = await Promise.all(search.results.slice(0, 50).map((r: any) => r.data()));
        setPagefindResults(results);
      } catch (e) {
        console.warn('Pagefind search not available or failed, using fallback client-side search', e);
        setPagefindResults(null);
      } finally {
        setPagefindLoading(false);
      }
    };

    const debounceTimer = setTimeout(performSearch, 200);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery<PostCardData[]>({
    queryKey: ['postsSearchIndex'],
    queryFn: async () => {
      const base = import.meta.env.BASE_URL;
      const url = base.endsWith('/') ? `${base}search-index.json` : `${base}/search-index.json`;
      const res = await fetch(url);
      if (!res.ok) {
        const fallback = await fetch('/search-index.json');
        if (!fallback.ok) throw new Error('Failed to fetch search index');
        return fallback.json();
      }
      return res.json();
    },
  });

  const toggleCategory = useCallback((slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug],
    );
  }, []);

  const toggleTag = useCallback((slug: string) => {
    setSelectedTags((prev) =>
      prev.includes(slug) ? prev.filter((t) => t !== slug) : [...prev, slug],
    );
  }, []);

  const clearAll = useCallback(() => {
    setQuery('');
    setSelectedCategories([]);
    setSelectedTags([]);
    setSelectedAuthor('all');
    setSortBy('latest');
  }, []);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategories.length > 0) count += selectedCategories.length;
    if (selectedTags.length > 0) count += selectedTags.length;
    if (selectedAuthor !== 'all') count += 1;
    return count;
  }, [selectedCategories, selectedTags, selectedAuthor]);

  const filteredPosts = useMemo(() => {
    if (pagefindResults !== null) {
      const pagefindSlugs = pagefindResults
        .map((res: any) => {
          const cleanUrl = res.url.endsWith('/') ? res.url.slice(0, -1) : res.url;
          const match = cleanUrl.match(/\/post\/([^/]+)$/);
          return match ? match[1] : null;
        })
        .filter(Boolean) as string[];

      const matched = pagefindSlugs
        .map((slug) => posts.find((p) => p.slug === slug))
        .filter((p): p is PostCardData => !!p);

      return matched.filter((post) => {
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.some((c) => post.categories.includes(c));
        const matchesTag =
          selectedTags.length === 0 ||
          selectedTags.some((t) => post.tags.includes(t));
        const matchesAuthor =
          selectedAuthor === 'all' || post.authors?.includes(selectedAuthor);
        return matchesCategory && matchesTag && matchesAuthor;
      });
    }

    const queryWords = query
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 0);

    return posts.filter((post) => {
      const searchStr =
        `${post.title} ${post.description} ${post.content ?? ''} ${post.tags.join(' ')} ${post.categories.join(' ')} ${post.authors?.join(' ') ?? ''}`.toLowerCase();
      const matchesQuery =
        queryWords.length === 0 ||
        queryWords.every((word) => searchStr.includes(word));
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((c) => post.categories.includes(c));
      const matchesTag =
        selectedTags.length === 0 ||
        selectedTags.some((t) => post.tags.includes(t));
      const matchesAuthor =
        selectedAuthor === 'all' || post.authors?.includes(selectedAuthor);
      return matchesQuery && matchesCategory && matchesTag && matchesAuthor;
    });
  }, [posts, query, pagefindResults, selectedCategories, selectedTags, selectedAuthor]);

  const sortedPosts = useMemo(() => {
    const arr = [...filteredPosts];
    switch (sortBy) {
      case 'oldest':
        return arr.reverse();
      case 'reading-time-asc':
        return arr.sort((a, b) => a.readingTime - b.readingTime);
      case 'reading-time-desc':
        return arr.sort((a, b) => b.readingTime - a.readingTime);
      case 'alphabetical':
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      case 'alphabetical-desc':
        return arr.sort((a, b) => b.title.localeCompare(a.title));
      default:
        return arr;
    }
  }, [filteredPosts, sortBy]);

  const virtualizer = useVirtualizer({
    count: sortedPosts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 280,
    overscan: 5,
  });

  const filteredCategories = useMemo(() => {
    if (!categorySearch) return categories;
    const s = categorySearch.toLowerCase();
    return categories.filter((c) => c.title.toLowerCase().includes(s) || c.slug.includes(s));
  }, [categories, categorySearch]);

  const filteredTags = useMemo(() => {
    if (!tagSearch) return tags;
    const s = tagSearch.toLowerCase();
    return tags.filter((t) => t.title.toLowerCase().includes(s) || t.slug.includes(s));
  }, [tags, tagSearch]);

  const filteredAuthors = useMemo(() => {
    if (!authorSearch) return authors;
    const s = authorSearch.toLowerCase();
    return authors.filter((a) => a.name.toLowerCase().includes(s) || a.slug.includes(s));
  }, [authors, authorSearch]);

  const hasScrollableTags = tags.length > 25;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filter Sidebar */}
      <div className="space-y-5 lg:col-span-1">
        {/* Search Input */}
        <div className="relative">
          <HugeiconsIcon
            icon={SearchIcon}
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ds-text-muted pointer-events-none"
          />
          <Input
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 pr-9 h-10 rounded-xl"
          />
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setQuery('')}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            >
              <HugeiconsIcon icon={Cancel01Icon} size={14} />
            </Button>
          )}
        </div>

        {/* Categories: searchable multi-select */}
        <div className="p-4 rounded-xl border border-ds-outline-variant bg-ds-surface-low">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3">
            Categories
          </h2>
          <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between h-9 rounded-xl text-sm"
                />
              }
            >
              <span className="truncate">
                {selectedCategories.length === 0
                  ? 'All Categories'
                  : `${selectedCategories.length} selected`}
              </span>
              <HugeiconsIcon
                icon={ChevronDownIcon}
                size={14}
                className={cn(
                  'shrink-0 transition-transform duration-200',
                  categoryOpen && 'rotate-180',
                )}
              />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={4}
              className="w-[--radix-popover-trigger-width] p-0"
            >
              <div className="p-2 border-b border-ds-outline-variant">
                <div className="relative">
                  <HugeiconsIcon
                    icon={SearchIcon}
                    size={14}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ds-text-muted pointer-events-none"
                  />
                  <Input
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(e) => setCategorySearch(e.target.value)}
                    className="pl-8 h-8 rounded-lg text-xs"
                  />
                </div>
              </div>
              <ScrollArea className="max-h-64">
                <div className="p-2 space-y-0.5">
                  {filteredCategories.length === 0 ? (
                    <p className="text-xs text-ds-text-muted text-center py-3">No categories found</p>
                  ) : (
                    filteredCategories.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => toggleCategory(cat.slug)}
                        className={cn(
                          'flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm transition-colors',
                          'hover:bg-ds-surface-high focus:bg-ds-surface-high focus:outline-none',
                          selectedCategories.includes(cat.slug) &&
                            'bg-ds-primary-container/10',
                        )}
                      >
                        <Checkbox
                          checked={selectedCategories.includes(cat.slug)}
                          onCheckedChange={() => toggleCategory(cat.slug)}
                          className="pointer-events-none"
                        />
                        <span className="text-ds-on-surface-variant">
                          {cat.title}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>

          {selectedCategories.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {selectedCategories.map((slug) => {
                const cat = categories.find((c) => c.slug === slug);
                return (
                  <Badge
                    key={slug}
                    variant="secondary"
                    className="gap-1 pr-1 rounded-full cursor-pointer hover:bg-ds-error/10 hover:text-ds-error transition-colors"
                    onClick={() => toggleCategory(slug)}
                  >
                    {cat?.title ?? slug}
                    <HugeiconsIcon icon={Cancel01Icon} size={10} />
                  </Badge>
                );
              })}
            </div>
          )}
        </div>

        {/* Tags: searchable, scrollable when >25 */}
        <div className="p-4 rounded-xl border border-ds-outline-variant bg-ds-surface-low">
          <h2 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3">
            Tags
            {tags.length > 0 && (
              <span className="ml-1 font-normal normal-case">({tags.length})</span>
            )}
          </h2>
          <Popover open={tagOpen} onOpenChange={setTagOpen}>
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  className="w-full justify-between h-9 rounded-xl text-sm"
                />
              }
            >
              <span className="truncate">
                {selectedTags.length === 0
                  ? 'All Tags'
                  : `${selectedTags.length} selected`}
              </span>
              <HugeiconsIcon
                icon={ChevronDownIcon}
                size={14}
                className={cn(
                  'shrink-0 transition-transform duration-200',
                  tagOpen && 'rotate-180',
                )}
              />
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={4}
              className="w-[--radix-popover-trigger-width] p-0"
            >
              <div className="p-2 border-b border-ds-outline-variant">
                <div className="relative">
                  <HugeiconsIcon
                    icon={SearchIcon}
                    size={14}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ds-text-muted pointer-events-none"
                  />
                  <Input
                    placeholder="Search tags..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    className="pl-8 h-8 rounded-lg text-xs"
                  />
                </div>
              </div>
              <ScrollArea className="max-h-64">
                <div className="p-2 space-y-0.5">
                  {filteredTags.length === 0 ? (
                    <p className="text-xs text-ds-text-muted text-center py-3">No tags found</p>
                  ) : (
                    filteredTags.map((tag) => (
                      <button
                        key={tag.slug}
                        type="button"
                        onClick={() => toggleTag(tag.slug)}
                        className={cn(
                          'flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm transition-colors',
                          'hover:bg-ds-surface-high focus:bg-ds-surface-high focus:outline-none',
                          selectedTags.includes(tag.slug) &&
                            'bg-ds-primary-container/10',
                        )}
                      >
                        <Checkbox
                          checked={selectedTags.includes(tag.slug)}
                          onCheckedChange={() => toggleTag(tag.slug)}
                          className="pointer-events-none"
                        />
                        <span className="text-ds-on-surface-variant">
                          #{tag.slug}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {selectedTags.map((slug) => (
                <Badge
                  key={slug}
                  variant="secondary"
                  className="gap-1 pr-1 rounded-full cursor-pointer hover:bg-ds-error/10 hover:text-ds-error transition-colors"
                  onClick={() => toggleTag(slug)}
                >
                  #{slug}
                  <HugeiconsIcon icon={Cancel01Icon} size={10} />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Author: searchable dropdown */}
        {authors.length > 0 && (
          <div className="p-4 rounded-xl border border-ds-outline-variant bg-ds-surface-low">
            <h2 className="text-xs font-bold uppercase tracking-widest text-ds-text-muted mb-3">
              Author
            </h2>
            <Popover open={authorOpen} onOpenChange={setAuthorOpen}>
              <PopoverTrigger
                render={
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-between h-9 rounded-xl text-sm"
                  />
                }
              >
                <span className="truncate flex items-center gap-2">
                  <HugeiconsIcon icon={UserIcon} size={14} className="shrink-0 text-ds-text-muted" />
                  {selectedAuthor === 'all'
                    ? 'All Authors'
                    : authors.find((a) => a.slug === selectedAuthor)?.name ?? selectedAuthor}
                </span>
                <HugeiconsIcon
                  icon={ChevronDownIcon}
                  size={14}
                  className={cn(
                    'shrink-0 transition-transform duration-200',
                    authorOpen && 'rotate-180',
                  )}
                />
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={4}
                className="w-[--radix-popover-trigger-width] p-0"
              >
                <div className="p-2 border-b border-ds-outline-variant">
                  <div className="relative">
                    <HugeiconsIcon
                      icon={SearchIcon}
                      size={14}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 text-ds-text-muted pointer-events-none"
                    />
                    <Input
                      placeholder="Search authors..."
                      value={authorSearch}
                      onChange={(e) => setAuthorSearch(e.target.value)}
                      className="pl-8 h-8 rounded-lg text-xs"
                    />
                  </div>
                </div>
                <ScrollArea className="max-h-64">
                  <div className="p-2 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => { setSelectedAuthor('all'); setAuthorOpen(false); setAuthorSearch(''); }}
                      className={cn(
                        'flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm transition-colors',
                        'hover:bg-ds-surface-high focus:bg-ds-surface-high focus:outline-none',
                        selectedAuthor === 'all' && 'bg-ds-primary-container/10',
                      )}
                    >
                      <span className="text-ds-on-surface-variant font-medium">All Authors</span>
                    </button>
                    {filteredAuthors.length === 0 ? (
                      <p className="text-xs text-ds-text-muted text-center py-3">No authors found</p>
                    ) : (
                      filteredAuthors.map((author) => (
                        <button
                          key={author.slug}
                          type="button"
                          onClick={() => { setSelectedAuthor(author.slug); setAuthorOpen(false); setAuthorSearch(''); }}
                          className={cn(
                            'flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg text-sm transition-colors',
                            'hover:bg-ds-surface-high focus:bg-ds-surface-high focus:outline-none',
                            selectedAuthor === author.slug && 'bg-ds-primary-container/10',
                          )}
                        >
                          <div className="w-6 h-6 rounded-full bg-ds-primary-container text-ds-on-primary-container flex items-center justify-center text-[9px] font-bold shrink-0">
                            {author.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-ds-on-surface-variant">{author.name}</span>
                        </button>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>

      {/* Results Area */}
      <div className="lg:col-span-3 space-y-5">
        {/* Sort + Result Count */}
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          <div className="text-sm text-ds-on-surface-variant">
            {isLoading || pagefindLoading ? (
              <span className="flex items-center gap-2">
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-ds-primary border-t-transparent" />
                Searching...
              </span>
            ) : (
              <span>
                <span className="font-semibold text-ds-on-surface">
                  {sortedPosts.length}
                </span>{' '}
                result{sortedPosts.length !== 1 ? 's' : ''}
                {query && (
                  <span className="text-ds-text-muted"> for &quot;{query}&quot;</span>
                )}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {activeFilterCount > 0 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearAll}
                className="h-8 px-2.5 text-xs text-ds-primary hover:text-ds-error gap-1"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={12} />
                Clear ({activeFilterCount})
              </Button>
            )}

            <div className="flex items-center gap-1.5">
              <HugeiconsIcon
                icon={ArrowUpDownIcon}
                size={14}
                className="text-ds-text-muted"
              />
              <Select value={sortBy} onValueChange={(v) => setSortBy(v ?? 'latest')}>
                <SelectTrigger className="w-auto min-w-35 h-8 rounded-xl text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              <PostCardSkeleton count={5} />
            ) : error ? (
              <div className="text-center py-16 text-ds-text-muted">
                <HugeiconsIcon
                  icon={SearchIcon}
                  size={48}
                  className="mx-auto mb-3 opacity-40"
                />
                Failed to load posts index.
              </div>
            ) : sortedPosts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center min-h-[60vh] text-ds-text-muted border border-dashed border-ds-outline-variant rounded-xl bg-ds-surface-low"
              >
                <div className="text-center px-6">
                  <HugeiconsIcon
                    icon={SearchIcon}
                    size={56}
                    className="mx-auto mb-4 opacity-30"
                  />
                  <p className="text-base font-semibold mb-2 text-ds-on-surface">
                    {query
                      ? `No results found for "${query}"`
                      : 'No results found'}
                  </p>
                  <p className="text-sm text-ds-text-muted max-w-md mx-auto">
                    Try adjusting your filters or search query. You can browse all posts or explore categories and tags.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={clearAll}
                    className="mt-4 rounded-xl"
                  >
                    Clear all filters
                  </Button>
                </div>
              </motion.div>
            ) : sortedPosts.length > 10 ? (
              <div
                ref={parentRef}
                className="overflow-auto max-h-200"
              >
                <div
                  style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {virtualizer.getVirtualItems().map((virtualItem) => {
                    const post = sortedPosts[virtualItem.index];
                    return (
                      <div
                        key={virtualItem.key}
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: `${virtualItem.size}px`,
                          transform: `translateY(${virtualItem.start}px)`,
                        }}
                      >
                        <PostCard post={post} index={virtualItem.index} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              sortedPosts.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i} />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function SearchFeed(props: SearchFeedProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchFeedContent {...props} />
    </QueryClientProvider>
  );
}
