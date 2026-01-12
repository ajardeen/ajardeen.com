import IconWrapper from "@/components/IconWrapper";
import { USER } from "@/data/user";
import { CodeXml, Mail, MapPin, PhoneCall } from "lucide-react";

function ProfileData() {
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
          <p className="text-balance">
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
          <p className="text-balance">
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
          <p className="text-balance">
            <a
              className="underline-offset-4 hover:underline tracking-wider"
              href={`tel:${decodeBase64(USER.phoneNumber)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {decodeBase64(USER.phoneNumber)}
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
