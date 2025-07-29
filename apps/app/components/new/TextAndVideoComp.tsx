import dynamic from "next/dynamic";
import React from "react";

const TextAndVideoComp = ({ userId }: { userId: string | null }) => {
  const TextAndVideo = dynamic(() => import("@/components/new/TextAndVideo"));

  return (
    <>
      <div className="w-full mb-52">
        <TextAndVideo
          userId={userId}
          label="open-source"
          title="Create"
          description="Simply designed to create perfect results fast. Elementary tools, advanced features and unlimited options with an infinite canvas."
          leftImg="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/bulb_icon.svg"
          type="normal"
          videoUrl="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Usecases_edit_video-1.mp4"
          isBiglayout
        />
      </div>
      <div className="w-full mb-52">
        <TextAndVideo
          userId={userId}
          label="easy to use"
          title="Collaborate"
          description="Send link, get feedback and finish the idea together."
          leftImg="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/collaborate_arrows_icon.svg"
          type="normal"
          videoUrl="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/Collaborate_video.mp4"
          isBiglayout
        />
      </div>
      <div className="w-full mb-60">
        <TextAndVideo
          userId={userId}
          label="real-time collaboration"
          title="Common usecases"
          description="Meetings, Brainstorming, Diagrams, Interviews, Quick wireframing and more ..."
          leftImg="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/target_arrow_icon.svg"
          type="long-text"
          videoUrl="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/create_video_temp.mp4"
          isBiglayout
        />
      </div>
      <div className="w-full">
        <TextAndVideo
          userId={userId}
          label="no sign-up"
          title="The easiest way to get your thoughts on screen"
          description="Quick drawings and mockups with a unique aesthetic. It's dead simple. We help you with intuitive shortcuts & command palette."
          leftImg="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/hand_easy_icon.svg"
          type="twitter"
          videoUrl="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/The_best_UI_video.mp4"
          isBiglayout
        />
        <div className="w-full mt-66">
          <TextAndVideo
            userId={userId}
            label="whiteboard"
            title="Online"
            description="Something on your mind? Simply start drawing!"
            leftImg="https://excalidraw.nyc3.cdn.digitaloceanspaces.com/lp-cms/media/excalidraw_logo_icon.svg"
            type="normal"
            isBiglayout={false}
          />
        </div>
      </div>
    </>
  );
};

export default TextAndVideoComp;
