export const formatDate = (dateInput) => {
    const date = new Date(dateInput);
    
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    
    return date.toLocaleDateString(undefined, options);
  };