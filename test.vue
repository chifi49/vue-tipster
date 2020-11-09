<template>
    <div id="app" style="min-height:400px">
        <table width="100%" height="100%" style="min-height:100%" cellpadding="5" border="0" >
            <tr valign="top">
                <td>
                    <vuetipster @shown="shown" @hidden="hidden" title="persist on me!" content="mouse hover me and i won't hide" :keep_on_over="popup_keep_on_over">
                        <button >hover with persistence</button>
                    </vuetipster>
                </td>

                <td>
                    <br /><br /><br />
                    <vuetipster title="simple" placement="right" :content="popup_content">
                        <button >i have a tooltip</button>
                    </vuetipster>
                    <br />
                    <vuetipster placement="bottom-right">
                        <button>with all slots</button>
                        <template v-slot:title>
                            <h1>Heading h1</h1>
                        </template>
                        <template v-slot:content>
                            <ul>
                                <li>with</li>
                                <li>html</li>
                                <li>content</li>
                            </ul>
                        </template>
                        <template v-slot:footer>
                            <footer>original footer</footer>
                        </template>
                    </vuetipster>
                </td>
                <td>
                    <vuetipster :header_bg_color='header_bg_color' ref="manual_popper" :title="popup_title" :content="popup_content_html" :manual="popup_manual">
                        <button >manual - someone else controls me</button>
                    </vuetipster>
                    &nbsp;
                    <button @click="$refs['manual_popper'].show()">show</button>
                    &nbsp;
                    <button @click="$refs['manual_popper'].hide()">hide</button>
                    &nbsp;
                    <button @click='header_bg_color="pink"'>set pink header</button>
                </td>
            </tr>
            <tr valign="middle">
                <td>
                    <vuetipster :title="popup_title" :content="popup_content">
                        <button name="hithere">i have a tooltip</button>
                    </vuetipster>
                </td>
                <td>
                    <br /><br /><br />
                    <button @click="$refs['notifier'].show()">show notification</button>
                    &nbsp;
                    <button @click="$refs['notifier_hover'].show();">show notification with keep on hover</button>
                    &nbsp;
                    <button @click="$refs['notifier_click'].show()">show notification and close on click</button>
                    <br />
                    <button @click="$refs['notifier_permanent'].show()">permament notification</button>

                    <vuetipster ref="notifier" type="notification" title="i will notify" content="i will be your permanent notifier" placement="top-right">

                        
                    </vuetipster>
                    <vuetipster ref="notifier_hover" placement="bottom" :keep_on_over="popup_keep_on_over" type="notification" title="i will notify" content="i will be your permanent notifier and wont <br />close if you hover me"></vuetipster>
                    <vuetipster ref="notifier_click" :close_on_click="popup_keep_on_over" placement="bottom-right"  type="notification" title="i will notify" content="close me with a click :("></vuetipster>

                    <vuetipster :min_width="'400px'" ref="notifier_permanent" :backdrop="true" :backdrop_closable="true" :backdrop_bg_color="'rgba(0,0,0,0.5)'" :closable="true" placement="center"  :manual="true" type="notification">
                        <template v-slot:title>
                            Please confirm
                        </template>
                        <template v-slot:content>
                            <p>do you like apples?</p>
                        </template>
                        <template v-slot:footer>
                            <div style="text-align:right"><button @click="$refs['notifier_permanent'].hide()">yes</button><button>no</button></div>
                        </template>
                    </vuetipster>
                </td>
                <td>
                    </td>
            </tr>
            <tr valign="bottom">
                <td>
                        <br /><br /><br /><br /><br /><br />
                    <vuetipster :title="popup_title" :content="popup_content">
                        <button name="hithere">i have a tooltip</button>
                    </vuetipster>
                </td>
                <td>
                    <button id="target_button">with target</button>

                    <vuetipster placement='bottom-left' ref="popup-program" :title="popup_title" :content="popup_content_html" target="#target_button"></vuetipster>
                    &nbsp;
                    <button @click="showPopup">show</button>
                    &nbsp;
                    <button @click="hidePopup">hide</button>
                </td>
                <td>
                    <button id="target_button1" >1st target</button>    
                    &nbsp;
                    <button @click="popup_target='#target_button1'">choose me</button>
                    <br /><br />
                    <button id="target_button2" >2nd target</button>    
                    &nbsp;
                    <button @click="popup_target='#target_button2'">choose me</button>

                    <vuetipster placement="left" :target="popup_target" title="dynamic" content="i change buttons as i wish"></vuetipster>


                    <button @click="tipster_visible=!tipster_visible">toggle</button>
                    <vuetipster content="ola kala" v-if="tipster_visible">
                        <button>tooltip dynamic</button>
                    </vuetipster>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import vuetipster from './vue-tipster.vue'
export default{
    components:{
        'vuetipster':vuetipster
    },
    data(){
        return {
            header_bg_color:'blue',
            tipster_visible:false,
            popup_keep_on_over:true,
            popup_manual:true,
            popup_target:'#target_button1',
            popup_title:"ninja title",
            popup_content:"i am the popup content",
            popup_content_html:"<h3>i have <strong>html</strong> very very <i>strong</i><br/>Let's what we are going to do</h3>"
        }
    },
    methods:{
        showPopup(){
            this.$refs['popup-program'].show();
        },
        hidePopup(){
            this.$refs['popup-program'].hide();
        },
        shown(){
            console.log('shown callback')
        },
        hidden(){
            console.log('hidden callback');
        }
    },
    mounted(){

    }
}
</script>
<style >
h1, h2, h3{
    margin:0;padding:0;
}
</style>