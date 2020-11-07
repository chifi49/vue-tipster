<template>
    <div id="app" style="min-height:400px">
        <table width="100%" height="100%" style="min-height:100%" cellpadding="5" border="0" >
            <tr valign="top">
                <td>
                    <vuetipster title="persist on me!" content="mouse hover me and i won't hide" :keep_on_over="popup_keep_on_over">
                        <button >hover with persistence</button>
                    </vuetipster>
                </td>

                <td>
                    <br /><br /><br />
                    <vuetipster title="simple" :content="popup_content">
                        <button >i have a tooltip</button>
                    </vuetipster>
                </td>
                <td>
                    <vuetipster ref="manual_popper" :title="popup_title" :content="popup_content_html" :manual="popup_manual">
                        <button >manual - someone else controls me</button>
                    </vuetipster>
                    &nbsp;
                    <button @click="$refs['manual_popper'].show()">show</button>
                    &nbsp;
                    <button @click="$refs['manual_popper'].hide()">hide</button>
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

                    <vuetipster ref="notifier" type="notification" title="i will notify" content="i will be your permanent notifier" placement="top-right"></vuetipster>
                    <vuetipster ref="notifier_hover" placement="bottom" :keep_on_over="popup_keep_on_over" type="notification" title="i will notify" content="i will be your permanent notifier and wont <br />close if you hover me"></vuetipster>
                    <vuetipster ref="notifier_click" :close_on_click="popup_keep_on_over" placement="bottom-right"  type="notification" title="i will notify" content="close me with a click :("></vuetipster>
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

                    <vuetipster ref="popup-program" :title="popup_title" :content="popup_content_html" target="#target_button"></vuetipster>
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

                    <vuetipster :target="popup_target" title="dynamic" content="i change buttons as i wish"></vuetipster>
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