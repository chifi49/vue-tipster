<template>
    <span data-init='0' >
        <slot name="default"></slot>
        <div ref="backdrop" :style="{'position':'fixed','top':'0px','right':'0px','left':'0px','bottom':'0px','background-color':backdrop_bg_color,'display':backdrop_visible?'block':'none','transition':'opacity 0.3s'}"></div>
        <div ref="popupcontent" :style="{'display':'none',width:'auto','position':(type=='dialog' || type=='notification'?'fixed':'absolute'),'max-width':max_width,'width':width,'min-width':min_width,'left':popup_left+'px','top':popup_top+'px','visibility':'hidden','transition':'opacity 0.4s'}">

            <!-- top center caret-->
            <span v-if="type=='tooltip'?true:false" class="tipster-caret-bg tipster-caret-bg-top" :style="{'display':current_placement=='bottom'?'inline-block':'none',width:0,height:0,borderLeft:'9px solid transparent',borderRight:'9px solid transparent',borderBottom:'9px solid '+border_color,'left':(popup_width)-9+'px','position':'absolute','top':'-8px'}">
                <span class="tipster-caret" :style="{width:0,height:0,borderLeft:'7px solid transparent',borderRight:'7px solid transparent',borderBottom:'7px solid '+caret_bg_color,'left':'-7px','position':'absolute','top':'2px'}"></span>
            </span>

            <!--  right caret-->
            <span v-if="type=='tooltip'?true:false" class="tipster-caret-bg tipster-caret-bg-right" :style="{'display':current_placement=='left'?'inline-block':'none',width:0,height:0,borderLeft:'9px solid '+border_color,borderBottom:'9px solid transparent',borderTop:'9px solid transparent','left':(popup_width*2)+'px','position':'absolute','top':popup_height-9+'px'}">
                <span class="tipster-caret" :style="{width:0,height:0,borderLeft:'7px solid '+caret_bg_color,borderBottom:'7px solid transparent',borderTop:'7px solid transparent','left':'-9px','position':'absolute','top':'-7px'}"></span>
            </span>
            
            <div class="tipster-container" :style="{'border-color':border_color,'border-style':'solid',borderWidth:'1px','border-radius':'10px'}">
                <div class="tipster-header" :style="{'display':has_header?'block':'none','background-color':header_bg_color,'border-radius':'10px 10px 0px 0px', padding:'5px','position':'relative'}">
                    <slot name="title"><div v-html="title"></div></slot>
                    <a v-if="closable"  @click="hide" :style="{'cursor':'pointer','position':'absolute','top':'5px','right':'5px','display':'inline-block','height':'14px','width':'14px'}" >
                        <slot name="close-icon">
                            <span :style="{'display':'inline-block','height':'14px','width':'2px','transform':'rotate(45deg)',backgroundColor:'#fff'}"></span>
                            <span :style="{'display':'inline-block','height':'14px','width':'2px','transform':'rotate(-45deg)',backgroundColor:'#fff','position':'relative','left':'-2px'}"></span>
                        </slot>
                    </a>
                </div>
                <div class="tipster-content" :style="{'background-color':content_bg_color,'padding':'5px','border-radius':has_header && has_footer?'0px':(has_header?'0px 0px 10px 10px':(has_footer?'10px 10px 0px 0px':'10px'))}">
                    <slot name="content">
                        <div v-html="content"></div>
                    </slot>
                </div>
                <div class="tipster-footer" :style="{display:has_footer?'block':'none','border-radius':'0px 0px 10px 10px','background-color':footer_bg_color,padding:'5px'}">
                    <slot name="footer">
                        <div v-html="footer"></div>
                    </slot>
                </div>
            </div>

            <!-- left caret-->
            <span v-if="type=='tooltip'?true:false" class="tipster-caret-bg tipster-caret-bg-right" :style="{'display':current_placement=='right'?'inline-block':'none',width:0,height:0,borderRight:'9px solid '+border_color,borderBottom:'9px solid transparent',borderTop:'9px solid transparent','left':'-9px','position':'absolute','top':popup_height-9+'px'}">
                <span class="tipster-caret" :style="{width:0,height:0,borderRight:'7px solid '+caret_bg_color,borderBottom:'7px solid transparent',borderTop:'7px solid transparent','left':'2px','position':'absolute','top':'-7px'}"></span>
            </span>
            
            <span v-if="type=='tooltip'?true:false" class="tipster-caret-bg tipster-caret-bg-bottom" :style="{'display':current_placement=='top'?'inline-block':'none',width:0,height:0,borderLeft:'9px solid transparent',borderRight:'9px solid transparent',borderTop:'9px solid '+border_color,'left':(popup_width)-9+'px','position':'absolute','bottom':'-8px'}">
                <span class="tipster-caret" :style="{width:0,height:0,borderLeft:'7px solid transparent',borderRight:'7px solid transparent',borderTop:'7px solid '+caret_bg_color,'left':'-7px','position':'absolute','top':'-9px'}"></span>
            </span>

        </div><!--popupcontent-->
    </span>
</template>
<script>
import Vue from 'vue';
export default{
    name:'vue-tipster',
    props:{
        backdrop:{
            required:false,
            type:Boolean,
            default:false
        },
        backdrop_bg_color:{
            required:false,
            type:String,
            default:'rgba(0,0,0,0.3)'
        },
        backdrop_closable:{
            required:false,
            type:Boolean,
            default:false
        },
        closable:{
            required:false,
            type:Boolean,
            default:false
        },
        type:{
            required:false,
            type:String,
            default:'tooltip' //tooltip, dialog or notification
        },
        timeout:{
            required:false,
            type:Number,
            default:2500
        },
        title:{
            required:false,
            type:String,
            default:''
        },
        content:{
            required:false,
            type:String,
            default:''
        },
        footer:{
            required:false,
            type:String,
            default:''
        },
        min_width:{
            required:false,
            type:String,
            default:'auto'
        },
        width:{
            required:false,
            type:String,
            default:'auto'
        },
        max_width:{
            required:false,
            type:String,
            default:'100%'
        },
        header_bg_color:{
            required:false,
            type:String,
            default:'#ccc'
        },
        footer_bg_color:{
            required:false,
            type:String,
            default:'#ccc'
        },
        content_bg_color:{
            required:false,
            type:String,
            default:'#fff'
        },
        border_color:{
            required:false,
            type:String,
            default:'#afafaf'
        },
        placement:{
            required:false,
            type:String,
            default:'auto' 
            //for notification
            //top, top-left, top-right, center, center-left, center-right, bottom, bottom-left, bottom-right
            //for tooltip
            //top, bottom, left, right
        },
        target:{
            required:false,
            type:String,
            default:null
        },
        manual:{
            required:false,
            type:Boolean,
            default:false
        },
        toggle:{
            required:false,
            type:Boolean,
            default:false
        },
        keep_on_over:{
            required:false,
            type:Boolean,
            default:false
        },
        close_on_click:{
            required:false,
            type:Boolean,
            default:false
        }
    },
    watch:{
        type:function(newval,oldval){
            if(newval!=oldval){
                throw new Error('You cannot change my type');
            }
        },
        target:function(newval,oldval){
            //console.log(newval,oldval);
            if(newval!=oldval){
                this.removeHandlers();
                this.dsDom = document.querySelector(newval);
                this['setupHandlers_'+this.type]();
            }
        }
    },
    computed:{
       
        caret_position_top:function(){
            if(this.current_placement=='bottom'){
                return 'auto';
            }
            return '-8px';
        },
        caret_position_bottom:function(){
            if(this.current_placement=='top'){
                return 'auto';
            }
            return '-8px';
        },
        has_header:function(){
            return this.title!='' || (typeof this.$slots.title!=='undefined' && this.$slots.title.length>0)?true:false;
        },
        has_footer:function(){
            return this.footer!='' || (typeof this.$slots.footer!=='undefined' && this.$slots.footer.length>0)?true:false;
        },
        caret_bg_color:function(){
            var bg_color = this.content_bg_color;
            if(this.has_header && this.current_placement=='bottom'){
                bg_color= this.header_bg_color;
            }
            //console.log('caret bg color',bg_color);
            return bg_color;
        }
    },
    data(){
        return {
            id:null,
            dsDom:null, //default slot dom
            popupO:null,
            original_target:'',//keep track if it was a slot or a target attribute (because target attribute can be track for changes)
            original_type:'',
            popup_left:'0px',
            popup_top:'0px',
            popup_opacity:0,
            popup_width:0,
            popup_height:0,
            hide_timeout:-1,
            hide_styles_timeout:-1,
            is_showing: false,
            current_placement:'bottom', //top, top-left, top-right, bottom, bottom-left, bottom-right (default is bottom)
            backdrop_visible:false,
            backdropO:null
        }
    },
    methods:{
        toggle_show(){
            if(this.is_showing){
                this.hide()
            }else{
                this.show();
            }
        },
        isShowning:function(){
            return this.is_showing;
        },
        setupHandlers_notification(){
            var me = this;
            if(this.backdrop_closable){
                //alert(true)
                this.backdropO.addEventListener('click',this.hide);
            }
            if(this.close_on_click){
                this.popupO.addEventListener('click',this.hide);
            }
            if(!this.manual){
                if(this.keep_on_over){
                    this.popupO.addEventListener('mouseover',()=>{
                        //console.log('on over');

                        me.show();
                        clearTimeout(this.hide_timeout);
                        clearTimeout(this.hide_styles_timeout);
                    })
                    this.popupO.addEventListener('mouseout',()=>{
                        this.hide_timeout = setTimeout(()=>{me.hide()},this.timeout);
                    })
                }
            }
        },
        setupHandlers_tooltip(){
            if(this.dsDom!=null){

                var me = this;
                if(!this.manual){
                    if(this.toggle){
                        this.dsDom.addEventListener('click',this.toggle_show)
                    }else{
                        if(this.keep_on_over){
                            this.popupO.addEventListener('mouseover',()=>{
                               // console.log('on over');
                                me.show();
                            })
                            this.popupO.addEventListener('mouseout',()=>{
                                me.hide();
                            })
                        }
                        this.dsDom.addEventListener('focus',this.show)
                        this.dsDom.addEventListener('mouseover',this.show)
                        this.dsDom.addEventListener('blur',this.hide)
                        this.dsDom.addEventListener('mouseout',this.hide)
                    }
                }
                if(this.close_on_click){
                    this.popupO.addEventListener('click',this.hide);
                }
            }
        },
        
        removeHandlers(){
            this.dsDom.removeEventListener('mouseover',this.show)
            this.dsDom.removeEventListener('focus',this.show);
            this.dsDom.removeEventListener('click',this.toggle_show);

            this.dsDom.removeEventListener('mouseout',this.hide);
            this.dsDom.removeEventListener('blur',this.hide);

            if(this.keep_on_over && this.popupO!=null){
                this.popupO.removeEventListener('mouseover',this.show);
                this.popupO.removeEventListener('mouseout',this.hide);
            }
            if(this.backdrop_closable){
                this.backdropO.removeEventListener('click',this.hide);
            }
        },
        measureViewport(){
            var div = document.createElement('div');
            div.style.zIndex=-1;
            div.style.position='fixed';
            div.style.visibility='hidden';
            div.style.opacity=0;
            div.style.top='0px';
            div.style.left='0px';
            div.style.right='0px';
            div.style.bottom='0px';
            document.body.appendChild(div);
            var dim = div.getBoundingClientRect();
            var view = {
                width: dim.width,
                height: dim.height
            }
            document.body.removeChild(div);
            //console.log(view);
            return view;
        },
        show(){
            //console.log(this.dsDom);
            clearTimeout(this.hide_styles_timeout);
            clearTimeout(this.hide_timeout);

            this.popupO.style.opacity = 0;
            this.popupO.style.display='inline-block';

            //viewport dimensions
            var view_dim = this.measureViewport();

            var target_dim = this.type=='tooltip'?this.target_dim():view_dim;
            
            //measure after we set display to inline-block because in hidden it can report wrongly
            var tipster_dim = this.tipster_dim();

            var left = 0;
            var top = 0;
            //console.log(view_dim);
            
           
            
            if(this.type=='tooltip'){
                this.current_placement='bottom';

                left = target_dim.left+(target_dim.width/2)-(tipster_dim.width/2);

                if(this.placement=='top-left' || this.placement=='bottom-left'){
                    left = target_dim.left;
                }else if(this.placement=='top-right' || this.placement=='bottom-right'){
                    left = target_dim.left+target_dim.width-tipster_dim.width;
                }

                if(left<0){
                    left = target_dim.left;
                }else if(left+tipster_dim.width>view_dim.width){
                    left = target_dim.left+target_dim.width-tipster_dim.width;
                }
                
                //always default to bottom
                top = target_dim.top+target_dim.height+10;
                if(this.placement=='top' || this.placement=='top-left' || this.placement=='top-right'){
                    top = target_dim.top-tipster_dim.height-10;    
                }else if(this.placement=='left' ){
                    top = target_dim.top+(target_dim.height/2)-tipster_dim.height/2;
                    left = target_dim.left-tipster_dim.width-10;
                    this.current_placement = 'left';
                }else if(this.placement=='right'){
                    top = target_dim.top+(target_dim.height/2)-tipster_dim.height/2;
                    left = target_dim.left+target_dim.width+10;
                    this.current_placement = 'right';
                }
                
                if(top+tipster_dim.height>view_dim.height){
                    top = target_dim.top - tipster_dim.height-10;
                    //move to top
                    this.current_placement='top';
                }
                top= top+window.scrollY;
            }else{
                //assume left is always top-left, center-left, bottom-left
                left = 10;
                if(['center','top','bottom'].indexOf(this.placement)!=-1 ){
                    left = view_dim.width/2-tipster_dim.width/2;
                }else if(['top-right','center-right','bottom-right'].indexOf(this.placement)!=-1){
                    left = view_dim.width - tipster_dim.width-10;
                }
                top = 10;
                if(this.placement=='center'){
                    top = view_dim.height/2-tipster_dim.height/2;
                }else if(['bottom-left','bottom','bottom-right'].indexOf(this.placement)!=-1){
                    top = view_dim.height-tipster_dim.height-10;
                }
            }

            this.popup_left = left;
            this.popup_top = top;


            this.popupO.style.visibility = 'visible';
            //this.popupO.style.transition='0.5s';
            this.popup_width = tipster_dim.width/2;
            this.popup_height = tipster_dim.height/2;
            //console.log(tipster_dim);

            if(this.backdrop){
                this.backdrop_visible = true;
                this.backdropO.style.zIndex = 99;
                this.backdropO.style.opacity = 1;
            }

            this.popupO.style.opacity = 1;
            this.popupO.style.zIndex = 100;
            this.is_showing = true;

            if(this.type=='notification'){
                if(!this.close_on_click && !this.manual){
                    this.hide_timeout = setTimeout(this.hide,this.timeout);
                }
            }

        },
        hide(){
            clearTimeout(this.hide_timeout);
            clearTimeout(this.hide_styles_timeout);
            this.hide_timeout = setTimeout(()=>{
                //this.popup_opacity = 0;
                this.backdropO.style.opacity = 0;
                this.popupO.style.opacity = 0;
                this.is_showing = false;
                this.hide_styles_timeout = setTimeout(()=>{
                    this.backdropO.style.zIndex = -1;
                    this.backdrop_visible = false;

                    this.popupO.style.zIndex = -1;
                    this.popupO.style.visibility = 'hidden';
                    //this.popup_display='none';
                    this.popupO.style.display='none';
                },500);
            },100);
        },
        target_dim(){
            return this.dsDom.getBoundingClientRect();
        },
        tipster_dim(){
            return this.popupO.getBoundingClientRect();
        },
        resized(){
            //console.log(window.scrollY);
            if(this.is_showing && this.type=='tooltip'){
                //find the new coordinates
                this.show();
            }
        },
        getDateTime(){
            var d = new Date();
            var month = d.getMonth()+1;
            var day = d.getDate()+1;
            var hours = d.getHours();
            var mins = d.getMinutes();
            var secs = d.getSeconds();
            var mills = d.getMilliseconds();
            return d.getFullYear()+''+(month<10?'0'+month:month)+''+(day<10?'0'+day:day)+''+(hours<10?'0'+hours:hours)+''+(mins<10?'0'+mins:mins)+''+(secs<10?'0'+secs:secs)+'.'+mills
        }
    },
    created(){
        if(typeof this.$vtipster=='undefined'){

            Vue.prototype.$vtipster  = Vue.observable({
                instances:0,
                creations:0,
                listeners:[]
            })
            Vue.prototype.$vtipster.actions = {
                increaseInstance:function(){

                }
            }
            Vue.prototype.$vtipster.subscribe = function(name,callback){
                this.listeners[name].push(callback);
            }
        }
        this.$vtipster.instances++;
        this.$vtipster.creations++;
        this.id = 'vue-tipster-'+this.getDateTime()+'.'+this.$vtipster.creations;
    },
    mounted(){
        
        var popup_e = document.querySelector("[data-id='"+this.id+"']");
        if(popup_e!=null){
            document.body.removeChild(popup_e);
            console.log('remove from mounted');
        }
        var inited = this.$el.getAttribute('data-init');
        if(parseInt(inited)==1){
            console.log('inited');
            this.$el.setAttribute('data-init',1);
        }
        //console.log(this.id);
        //console.log(this.$slots.default[0].elm);
        this.original_type = this.type;

        this.backdropO = this.$refs['backdrop'];
        this.backdropO.setAttribute('data-id','background-'+this.id);
        document.body.appendChild(this.backdropO);

        this.popupO = this.$refs['popupcontent'];
        this.popupO.setAttribute('data-id',this.id)
        //append to body and it will automatically move to end of the <body> tag

        document.body.appendChild( this.popupO );


        //only tooltip needs the default slot or target as a trigger (other types do not need a trigger)
        if(this.original_type=='tooltip'){
            if(typeof this.$slots.default!=='undefined' && this.$slots.default.length>0){
                this.dsDom = this.$slots.default[0].elm
                this.original_target = 'slot';
            }else if(this.target!=null){
                this.dsDom = document.querySelector(this.target);
                this.$el.style.display='none';
                this.original_target = 'target';
            }
        }
       
        this['setupHandlers_'+this.type]();
        window.addEventListener('resize',this.resized);
    },
    beforeDestroy(){
        //alert('before')
        this.$vtipster.instances--;
        console.log(this.$vtipster.instances);
        document.body.removeChild(this.popupO);
    },
    destroy(){
        this.$vtipster.instances-=1;
        
        window.removeEventListener('resize',this.resized);
        this.removeHandlers();
        //document.body.removeChild( this.popupO );
        //document.body.removeChild( this.popupO );
        console.log('removed popupO');
    }
}
</script>