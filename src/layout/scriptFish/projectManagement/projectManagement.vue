<template>
<div class="projectManagement">
</div>
</template>

<script>
export default {
    mounted() {
        this.handleQuery_Script_Project()
    },
    methods: {
        handleQuery_Script_Project() {
            let params = {
                token: localStorage.getItem("storeToken"),
            };
            this.$api.query_script_project(params).then((res) => {
                console.log(res)
            })
        }
    },
}
</script>

<style lang="scss" scoped>
.projectManagement {
    margin: 0;
    padding: 20px;
    padding-top: 30px;
}
</style>
