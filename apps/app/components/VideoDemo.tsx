import React from "react";

const VideoDemo = () => {
  return (
    <section className="py-24 px-4 w-full">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-black dark:text-white">
          See How It Works
        </h2>
        <div className="aspect-video relative group cursor-pointer">
          <div className="absolute inset-0 flex items-center justify-center"></div>
          <video controls className="w-full h-full object-cover rounded-lg">
            <source
              src={`${process.env.NEXT_PUBLIC_BASE_URL}/videos/resume.mp4`}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
