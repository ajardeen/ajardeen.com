import IconWrapper from "@/components/IconWrapper";
import { USER } from "@/data/user";
import { useSound } from "@/hooks/use-sounds";
import { CodeXml, FileUser, Mail, MapPin, PhoneCall } from "lucide-react";

function ProfileData() {
  const playClick = useSound("/audio/ui-sounds/redirectUiSound.wav");
  return (
    <div className="screen-line-after screen-line-before border-x border-t-0 p-4 space-y-2.5 ">
      <div className="flex gap-3.5  py-1">
        <IconWrapper>
          <CodeXml />
        </IconWrapper>
        <p className="text-balance">{USER.jobTitle}</p>
      </div>
      {/* grid block  */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* address  */}
        <div className="flex gap-3.5  py-1">
          <IconWrapper>
            <MapPin />
          </IconWrapper>
          <p className="text-balance" onClick={()=>playClick()}>
            <a
              className="underline-offset-4 hover:underline tracking-wider"
              // Encodes the address and opens it in Google Maps
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                USER.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {USER.address}
            </a>
          </p>
        </div>
        {/* email  */}
        <div className="flex gap-3.5  py-1">
          <IconWrapper>
            <Mail />
          </IconWrapper>
          <p className="text-balance" onClick={()=>playClick()}>
            <a
              className="underline-offset-4 hover:underline tracking-wider"
              href={`mailto:${decodeBase64(USER.email)}`}
            >
              {decodeBase64(USER.email)}
            </a>
          </p>
        </div>
        {/* phone number  */}
        <div className="flex gap-3.5  py-1">
          <IconWrapper>
            <PhoneCall />
          </IconWrapper>
          <p className="text-balance" onClick={()=>playClick()}>
            <a
              className="underline-offset-4 hover:underline tracking-wider"
              href={`tel:${decodeBase64(USER.phoneNumber)}`}
            >
              {decodeBase64(USER.phoneNumber)}
            </a>{" "}
            or
            <a
              className="underline-offset-4 hover:underline tracking-wider"
              href={`https://wa.me/${decodeBase64(USER.phoneNumber).replace(
                /\D/g,
                ""
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp;WhatsApp
            </a>
          </p>
        </div>
        <div className="flex gap-3.5  py-1">
          <IconWrapper>
            <FileUser />
          </IconWrapper>
          <p className="text-balance" onClick={()=>playClick()}>
            <a
              className="underline-offset-4 hover:underline tracking-wider"
              href={USER.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Resume File
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

function decodeBase64(base64String: string) {
  const decodedString = atob(base64String);
  return decodedString;
}

export default ProfileData;
