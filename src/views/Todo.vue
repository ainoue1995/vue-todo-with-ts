<template>
    <div class="todo">
        <!--        // LitComponentを呼び出し、addListを渡してる。-->
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
