export function toggleBool(bool) {
    return !bool;
}
export async function loadImage(url){
    let image = new Image(40, 200);
    image.src = url;
    await new Promises(res => image.onload(res))
    return image;
}