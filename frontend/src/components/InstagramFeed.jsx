import React from 'react';
import "./styles/InstagramFeed.css"

const InstagramFeed = () => {
  const posts = [
    {
      id: "1",
      media_url: "https://images.unsplash.com/photo-1522968439036-e6338d0ed84f?q=80&w=3259&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      permalink: "#",
      caption: "Classic black suit for every occasion.",
    },
    {
      id: "2",
      media_url: "https://plus.unsplash.com/premium_photo-1670984281009-863453504c52?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      permalink: "#",
      caption: "Stylish brown leather shoes to complete your outfit.",
    },
    {
      id: "3",
      media_url: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2193&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      permalink: "#",
      caption: "The perfect combination of style and comfort.",
    },
  ];

  return (
    <section className="instagram-feed py-16 bg-gray-100">
      <h2 className="text-4xl font-extrabold text-center tracking-wide text-gray-900 mb-12">
        Follow Us On Instagram
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 container mx-auto px-4">
        {posts.map((post) => (
          <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer">
            <div className="instagram-post">
              <img
                src={post.media_url}
                alt={post.caption}
                className="w-full h-full object-cover"
              />
              <div className="caption">
                <p>{post.caption}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default InstagramFeed;
