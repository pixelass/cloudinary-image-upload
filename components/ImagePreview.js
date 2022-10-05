import Image from "next/image";
import { useMemo } from "react";

export default function ImagePreview({
  file,
  height = 180,
  width = 320,
  objectFit = "cover",
}) {
  const src = useMemo(() => URL.createObjectURL(file), [file]);

  return (
    <div style={{ position: "relative", height, width }}>
      <Image src={src} alt="" layout="fill" objectFit={objectFit} />
    </div>
  );
}
