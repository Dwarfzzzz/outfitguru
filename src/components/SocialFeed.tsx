import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Heart, MessageCircle, UserPlus, UserMinus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface Post {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string;
  };
  likes: { user_id: string }[];
  comments: {
    id: string;
    content: string;
    user_id: string;
    profiles: {
      username: string;
    };
  }[];
}

export const SocialFeed = () => {
  const [newComment, setNewComment] = useState("");
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);
    };
    getCurrentUser();
  }, []);

  const { data: posts, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(`
          *,
          profiles (username, avatar_url),
          likes (user_id),
          comments (
            id,
            content,
            user_id,
            profiles (username)
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Post[];
    },
  });

  const handleLike = async (postId: string) => {
    if (!currentUserId) return;

    const { error } = await supabase.from("likes").insert({
      post_id: postId,
      user_id: currentUserId,
    });

    if (error) {
      if (error.code === "23505") {
        // Unique violation - user already liked the post
        const { error: deleteError } = await supabase
          .from("likes")
          .delete()
          .match({ 
            post_id: postId, 
            user_id: currentUserId 
          });

        if (deleteError) {
          toast({
            title: "Error",
            description: "Could not unlike the post",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Could not like the post",
          variant: "destructive",
        });
      }
    }
    refetch();
  };

  const handleComment = async (postId: string) => {
    if (!newComment.trim() || !currentUserId) return;

    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      content: newComment,
      user_id: currentUserId,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Could not post comment",
        variant: "destructive",
      });
    } else {
      setNewComment("");
      refetch();
    }
  };

  const handleFollow = async (userId: string) => {
    if (!currentUserId) return;

    const { error } = await supabase.from("followers").insert({
      follower_id: currentUserId,
      following_id: userId,
    });

    if (error) {
      if (error.code === "23505") {
        // User is already following, so unfollow
        const { error: deleteError } = await supabase
          .from("followers")
          .delete()
          .match({
            follower_id: currentUserId,
            following_id: userId,
          });

        if (deleteError) {
          toast({
            title: "Error",
            description: "Could not unfollow user",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Could not follow user",
          variant: "destructive",
        });
      }
    }
    refetch();
  };

  return (
    <div className="space-y-6">
      {posts?.map((post) => (
        <Card key={post.id} className="bg-white shadow-md">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar>
              <AvatarImage src={post.profiles.avatar_url || ""} />
              <AvatarFallback>{post.profiles.username[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold">{post.profiles.username}</h3>
              <p className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleFollow(post.user_id)}
            >
              {post.user_id === currentUserId ? (
                <UserMinus className="h-5 w-5" />
              ) : (
                <UserPlus className="h-5 w-5" />
              )}
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full rounded-lg object-cover"
              style={{ maxHeight: "500px" }}
            />
            <div>
              <h4 className="font-semibold">{post.title}</h4>
              <p className="text-gray-600">{post.description}</p>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <div className="flex w-full justify-between">
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => handleLike(post.id)}
              >
                <Heart
                  className={`h-5 w-5 ${
                    post.likes.some(
                      (like) => like.user_id === currentUserId
                    )
                      ? "fill-red-500 text-red-500"
                      : ""
                  }`}
                />
                <span>{post.likes.length}</span>
              </Button>
              <Button
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => setActivePostId(post.id)}
              >
                <MessageCircle className="h-5 w-5" />
                <span>{post.comments.length}</span>
              </Button>
            </div>
            {activePostId === post.id && (
              <div className="w-full space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <Button onClick={() => handleComment(post.id)}>Post</Button>
                </div>
                <div className="space-y-2">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2 text-sm">
                      <span className="font-semibold">
                        {comment.profiles.username}:
                      </span>
                      <span>{comment.content}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};