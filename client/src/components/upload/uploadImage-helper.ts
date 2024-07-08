export function formatFileSize(bytes : number) {
  if (bytes < 1048576) {
    return Math.round(bytes / 1024) + ' KB';
  } else {
    return Math.round(bytes / 1048576) + ' MB';
  }
}


export function formatFileName(name: string) {
    const maxLen = 15;
    if(name.length > maxLen) {
        return name.substring(0,maxLen) + '....'
    }
    return name;
}