<template>
    <div>
        <application-card v-if="!!applicationCode" :applicationCode="applicationCode" />
    </div>
</template>


<script setup>
import ApplicationCard from '@/components/ApplicationCard.vue';
</script>

<script>
export default {
    computed: {
        applicationCode: {
            get() {
                return this.$route?.params?.applicationId ?? "";
            },
        }
    }
}
</script>