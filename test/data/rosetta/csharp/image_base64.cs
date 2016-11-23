// Image to Base64 String
public string ImageToBase64(Image image, System.Drawing.Imaging.ImageFormat format) {
  using (MemoryStream ms = new MemoryStream()) {
    // Convert Image to byte[]
    image.Save(ms, format);
    byte[] imageBytes = ms.ToArray();

    // Convert byte[] to Base64 String
    string base64String = Convert.ToBase64String(imageBytes);
    return base64String;
  }
}

// Base64 String to Image
public Image Base64ToImage(string base64String) {
  // Convert Base64 String to byte[]
  byte[] imageBytes = Convert.FromBase64String(base64String);
  MemoryStream ms = new MemoryStream(imageBytes, 0, 
    imageBytes.Length);

  // Convert byte[] to Image
  ms.Write(imageBytes, 0, imageBytes.Length);
  Image image = Image.FromStream(ms, true);
  return image;
}