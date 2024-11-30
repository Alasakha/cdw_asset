import { ref } from 'vue';

export function useFilters() {
  const filters = ref({
    applicationId: '',
    applicant: '',
    assetName: '',
    department: '',
    status: '',
    date: null,
  });

  const resetFilters = () => {
    filters.value = {
      applicationId: '',
      applicant: '',
      assetName: '',
      department: '',
      status: '',
      date: null,
    };
  };

  return {
    filters,
    resetFilters,
  };
}