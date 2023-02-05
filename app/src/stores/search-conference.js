import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import debounce from 'lodash.debounce'

import { search as confSearch } from '@/API/conferences'

export const useSearchConferenceStore = defineStore('search-conference', () => {
  const search = ref('');
  const skipRouting = ref(false);
  const page = ref(0);
  const items = ref([]);
  const isLoading = ref(false);

  const router = useRouter();

  const startSearch = debounce(search => {
    confSearch({
      search,
      page: page.value
    })
      .then(confs => {
        page.value++;
        items.value.push(...confs);
      })
      .finally(() => isLoading.value = false);
  }, 1000);

  const searchChanged = (search) => {
    items.value.splice(0);
    page.value = 0;
    isLoading.value = false;

    if (skipRouting.value) {
      skipRouting.value = false;

      return;
    }

    if (search) {
      router.push('/conference/search');

      isLoading.value = true;
      startSearch(search);
    } else {
      router.push('/dashboard?input=1');

      startSearch.cancel();
    }
  };

  const resetSearch = () => {
    skipRouting.value = true
    search.value = ''
  }

  const next = () => {
    isLoading.value = true;
    startSearch(search.value);
  }

  watch(search, searchChanged);

  return {
    page,
    items,
    search,
    isLoading,
    next,
    resetSearch,
  };
})
