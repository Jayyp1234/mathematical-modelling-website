import Image from "next/image";
import { postDateLabel, type Post } from "@/lib/content";

/* The articles are not written yet, so these cards are deliberately not links.
   Re-attach `postUrl(post)` once /learn/blog/[slug] exists. */

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="border-line flex h-full flex-col overflow-hidden rounded-[10px] border bg-white">
      <div className="relative aspect-[307/178] overflow-hidden">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="(min-width:1280px) 420px, (min-width:640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col px-[20px] pt-[20px] pb-[22px]">
        <p className="text-body-light text-[13px] leading-[18px]">
          {postDateLabel(post)}
        </p>
        <h3 className="t-card-title mt-[10px] text-[18px] leading-[26px]">
          {post.title}
        </h3>
      </div>
    </article>
  );
}

export function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="border-line grid overflow-hidden rounded-[10px] border bg-white md:grid-cols-[minmax(0,560px)_1fr]">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          priority
          sizes="(min-width:768px) 560px, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center px-[26px] py-[30px] lg:px-[46px]">
        <p className="t-eyebrow text-accent text-[11px]">Latest post</p>
        <h2 className="t-h2 mt-[16px] text-[26px] leading-[36px]">
          {post.title}
        </h2>
        <p className="text-body-light mt-[10px] text-[13px] leading-[18px]">
          {postDateLabel(post)}
        </p>
      </div>
    </article>
  );
}
