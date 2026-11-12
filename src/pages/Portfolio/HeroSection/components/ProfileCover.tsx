import type { ReactNode } from "react";
import { BrandContextMenu } from "@/components/brand-context-menu";
import grassVideo from "@/assets/videos/Animate_small_grass_wind_motion.mp4";

function ProfileCover({ children }: { children?: ReactNode }) {
  return (
    <BrandContextMenu>
      <div data-header-container id="profile" className="relative select-none mt-5 sm:mt-10">
        {/* clipped layer: video only */}
        <div className="aspect-3/2 overflow-hidden rounded-2xl sm:aspect-3/1">
          <video
            src={grassVideo}
            autoPlay
            muted
            loop
            playsInline
            disablePictureInPicture
            disableRemotePlayback
            className="size-full object-cover pointer-events-none"
          />
        </div>

        {/* avatar: half on the cover, half below. Centered on mobile, left on sm+ */}
        <div className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 sm:left-6 sm:translate-x-0">
          {children}
        </div>
      </div>
    </BrandContextMenu>
  );
}

export default ProfileCover;