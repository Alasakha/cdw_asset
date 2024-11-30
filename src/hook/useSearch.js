// hooks/useSearch.js
import { ref ,onMounted} from 'vue';


export const useSearch = (assets) => {
  
  const filteredAssets = ref([]);
  const searchAssets = (filters) => {
    console.log(filters);  // 打印过滤条件
    if (!filters.applicationId && !filters.applicant && !filters.date && !filters.department)  {
      filteredAssets.value = [...assets];
    } else {
      filteredAssets.value = assets.filter((item) => {
        const [startDate, endDate] = item.borrowingTime.split(" ~ ").map(date => new Date(date));
        const pickerData = filters.date ? new Date(filters.date) : null;
        const isWithinDateRange = pickerData ? (pickerData >= startDate && pickerData <= endDate) : true;

        return (
          (filters.applicationId === "" || item.applicationId.includes(filters.applicationId)) &&
          (filters.applicant === "" || item.applicant.includes(filters.applicant)) && 
          (filters.department === "" || item.department.includes(filters.department)) &&
          isWithinDateRange
        );
      });
    }
  };

  return {   searchAssets,filteredAssets };
};
