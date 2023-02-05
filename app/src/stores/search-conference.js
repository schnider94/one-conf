import { ref, watch, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import debounce from 'lodash.debounce'

import { search as confSearch } from '@/API/conferences'

export const useSearchConferenceStore = defineStore('search-conference', () => {
  const search = ref('')
  const page = ref(0)
  const items = reactive([])

  const router = useRouter()

  const startSearch = debounce(search => {
    confSearch({
      search,
      page: page.value
    })
      .then(confs => {
        page.value++;
        items.push(...confs);
      });
  }, 1000);

  const searchChanged = (search) => {
    if (search) {
      router.push('/conference/search');

      startSearch(search);
    } else {
      router.push('/dashboard');

      startSearch.cancel();
    }
  };

  watch(search, searchChanged);

  return {
    page,
    items,
    search
  };
})
