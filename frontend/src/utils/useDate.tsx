function useDate() {
  function getPreviousOrNextDate(checkDate: Date, payload: number): string {
    const date = new Date();
    date.setDate(checkDate.getDate() + payload);
    return date.toISOString().substring(0, 10);
  }

  return {
    getPreviousOrNextDate,
  };
}

export default useDate;
