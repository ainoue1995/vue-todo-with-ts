<template>
    <div class="todo">
        <ListComponent/>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ListComponent from "@/components/List.vue";

    @Component({
        components: {
            ListComponent,
        },
    })
    export default class Todo extends Vue {
    }
</script>
