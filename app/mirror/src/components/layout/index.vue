
<template>
    <div id="content">
        <Menu> </Menu>
        <router-view/>
    </div>
</template>

<script>
import Menu from './menu';
export default {
    name:'ContenIndex',

    components:{
        Menu
    }
}
</script>

<style>

</style>
