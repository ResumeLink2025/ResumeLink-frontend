export const getProjectStatus = (status: string) => {
  switch (status) {
    case 'IN_PROGRESS':
      return '진행중';
    case 'COMPLETED':
      return '완료됨';
    case 'ON_HOLD':
      return '보류됨';
    default:
      return '진행중';
  }
};
