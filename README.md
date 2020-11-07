# vue-tipster
popup, tooltip & notification functionality made with vuejs without external dependencies

## Installation
`npm install --save @chifi49/vue-tipster`

or

`<script src="vue-tipster.umd.min.js"></script>`

## Usage
```
<template>
    <vuetipster content="i have a tooltip">
        <button>tooltip</button>
    </vuetipster>
</template>
<script>
import vuetipster from '@chifi49/vue-tipster';
export default{
    components:{
        vuetipster
    },
    data(){
        return {

        }
    }
}
</script>
```

or
```
<div id="app">
    <vuetipster content="i am a tooltip">
        <button>show my tooltip</button>
    </vuetipster>
</div>
<script src="vue-tipster.umd.min"></script>
<script>
new Vue({
    'el':'#app',
    components:{
        'vuetipster':window['vue-tipster']
    }
})
</script>