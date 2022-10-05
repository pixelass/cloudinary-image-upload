import { useState } from "react";
import Image from "next/image";
import ImagePreview from "../components/ImagePreview";

export default function Home() {
  const [images, setImages] = useState([]);
  const [image, setImage] = useState(null);
  const [imageValue, setImageValue] = useState("");

  return (
    <div>
      <h1>Cloudinary Image upload</h1>
      <h2>Pick an Image</h2>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          formData.append("file", image);
          formData.append(
            "upload_preset",
            process.env.NEXT_PUBLIC_UPLOAD_PRESET
          );
          const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDNAME}/upload`;
          const response = await fetch(url, {
            method: "POST",
            body: formData,
          });
          const json = await response.json();
          setImages([...images, json]);
          setImage(null);
        }}
      >
        <label id="image">Upload an image</label>
        <input
          type="file"
          name="image"
          id="image"
          accept="image/png,image/jpeg"
          value={imageValue}
          onChange={(event) => {
            setImageValue(event.target.value);
            setImage(event.target.files[0]);
          }}
        />
        {image && <ImagePreview file={image} />}

        <h2>Click the upload button</h2>
        <button type="submit">Upload</button>
      </form>
      <h2>Uploaded Images</h2>
      {images.map((image) => {
        return (
          <div
            key={image.asset_id}
            style={{ position: "relative", width: 320 }}
          >
            <Image
              src={image.secure_url}
              alt=""
              width={image.width}
              height={image.height}
              layout="responsive"
            />
          </div>
        );
      })}
    </div>
  );
}
