function DetectFormData(formData: object) {
  for (const key in formData) {
    if ((formData as any)[key] !== '') {
      return true;
    }
  }
  return false;
}

export default DetectFormData;
