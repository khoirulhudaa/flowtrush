const showFormattedDate = (date: any) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: 'numeric'
    }
    return new Date(date).toLocaleDateString("id-ID", options)
  }
  
  export default showFormattedDate;
  