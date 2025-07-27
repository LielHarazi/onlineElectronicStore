import { useState, useEffect, useCallback } from "react";
import type { PostsData } from "@/types";

export function usePosts() {
  const [postsData, setPostsData] = useState<PostsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/data/posts.json");
      if (!response.ok) {
        throw new Error(`Failed to fetch posts: ${response.status}`);
      }

      const data: PostsData = await response.json();
      setPostsData(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const refetch = useCallback(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { postsData, isLoading, error, refetch };
}
