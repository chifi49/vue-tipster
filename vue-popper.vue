<template>
    <span >
        <slot name="default"></slot>
        <div ref="popupcontent" :style="{'display':'none',width:'auto','position':'absolute','max-width':max_width,'min-width':min_width,'left':popup_left+'px','top':popup_top+'px','visibility':'hidden','transition':'opacity 0.5s'}">

            <span v-if="type=='tooltip'?true:false" class="popper-caret-bg popper-caret-bg-top" :style="{'display':current_placement=='bottom'?'inline-block':'none',width:0,height:0,borderLeft:'9px solid transparent',borderRight:'9px solid transparent',borderBottom:'9px solid '+border_color,'left':(popup_width)-9+'px','position':'absolute','top':'-8px'}">
                <span class="popper-caret" :style="{width:0,height:0,borderLeft:'7px solid transparent',borderRight:'7px solid transparent',borderBottom:'7px solid '+caret_bg_color,'left':'-7px','position':'absolute','top':'2px'}"></span>
            </span>
            
            <div class="popper-container" :style="{'border-color':border_color,'border-style':'solid',borderWidth:'1px','border-radius':'10px'}">
                <div class="popper-header" :style="{'display':has_header?'block':'none','background-color':header_bg_color,'border-radius':'10px 10px 0px 0px', padding:'5px'}">
                    <slot name="title">{{title}}</slot>
                </div>
                <div class="popper-content" :style="{'background-color':content_bg_color,'padding':'5px','border-radius':'10px'}">
                    <slot name="content">
                        <div v-html="content"></div>
                    </slot>
                </div>
                <div class="popper-footer" :style="{display:has_footer?'block':'none'}">
                </div>
            </div>
            
            <span v-if="type=='tooltip'?true:false" class="popper-caret-bg popper-caret-bg-bottom" :style="{'display':current_placement=='top'?'inline-block':'none',width:0,height:0,borderLeft:'9px solid transparent',borderRight:'9px solid transparent',borderTop:'9px solid '+border_color,'left':(popup_width)-9+'px','position':'absolute','bottom':'-8px'}">
                <span class="popper-caret" :style="{width:0,height:0,borderLeft:'7px solid transparent',borderRight:'7px solid transparent',borderTop:'7px solid '+caret_bg_color,'left':'-7px','position':'absolute','top':'-9px'}"></span>
            </span>

        </div><!--popupcontent-->
    </span>
</template>
<script>
export default{
    props:{
        type:{
            required:false,
            type:String,
            default:'tooltip' //tooltip, dialog or notification
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
        min_width:{
            required:false,
            type:String,
            default:'auto'
        },
        max_width:{
            required:false,
            type:String,
            default:'250px'
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
        }
    },
    watch:{
        type:function(newval,oldval){
            if(newval!=oldval){
                throw new Error('You cannot change my type');
            }
        },
        target:function(newval,oldval){
            console.log(newval,oldval);
            if(newval!=oldval){
                this.removeHandlers();
                this.dsDom = document.querySelector(newval);
                this.setupHandlers();
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
            return typeof this.$slots.footer!=='undefined'?true:false;
        },
        caret_bg_color:function(){
            var bg_color = this.content_bg_color;
            if(this.has_header && this.current_placement=='bottom'){
                bg_color= this.header_bg_color;
            }
            console.log('caret bg color',bg_color);
            return bg_color;
        }
    },
    data(){
        return {
            dsDom:null, //default slot dom
            popupO:null,
            original_target:'',//keep track if it was a slot or a target attribute (because target attribute can be track for changes)
            original_type:'',
            popup_left:'0px',
            popup_top:'0px',
            popup_opacity:0,
            popup_width:0,
            hide_timeout:-1,
            hide_styles_timeout:-1,
            is_showing: false,
            current_placement:'bottom' //top, top-left, top-right, bottom, bottom-left, bottom-right (default is bottom)
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
        setupHandlers(){
            if(this.dsDom!=null){

                var me = this;
                if(!this.manual){
                    if(this.toggle){
                        this.dsDom.addEventListener('click',this.toggle_show)
                    }else{
                        if(this.keep_on_over){
                            this.popupO.addEventListener('mouseover',()=>{
                                console.log('on over');
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
            }
        },
        
        removeHandlers(){
            this.dsDom.removeEventListener('mouseover',this.show)
            this.dsDom.removeEventListener('focus',this.show);
            this.dsDom.removeEventListener('click',this.toggle_show);

            this.dsDom.removeEventListener('mouseout',this.hide);
            this.dsDom.removeEventListener('blur',this.hide);
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
                w: dim.width,
                h: dim.height
            }
            document.body.removeChild(div);
            console.log(view);
            return view;
        },
        show(){
            //console.log(this.dsDom);
            clearTimeout(this.hide_styles_timeout);
            clearTimeout(this.hide_timeout);

            var target_dim = this.target_dim();
            
            //console.log(this.popupO);
            //console.log(this.popupO.style);
            //this.popupO.style.opacity = 0;
            //this.popupO.style.visibility = 'visible';
            
            this.popupO.style.opacity = 0;
            this.popupO.style.display='inline-block';

            //measure after we set display to inline-block because in hidden it can report wrongly
            var popper_dim = this.popper_dim();

            var view_dim = this.measureViewport();
            //console.log(view_dim);
            var left = target_dim.left+(target_dim.width/2)-(popper_dim.width/2);
            if(left<0){
                left = target_dim.left;
            }
            this.popup_left = left;
            var top = target_dim.top+target_dim.height+10;
            this.current_placement='bottom';
            if(top+popper_dim.height>view_dim.h){
                top = target_dim.top - popper_dim.height-10;
                //move to top
                this.current_placement='top';
            }
            this.popup_top = top+window.scrollY;
            this.popupO.style.visibility = 'visible';
            //this.popupO.style.transition='0.5s';
            this.popup_width = popper_dim.width/2;
            //console.log(popper_dim);
            this.popupO.style.opacity = 1;
            this.popupO.style.zIndex = 100;
            this.is_showing = true;

        },
        hide(){
            this.hide_timeout = setTimeout(()=>{
                //this.popup_opacity = 0;
                this.popupO.style.opacity = 0;
                this.is_showing = false;
                this.hide_styles_timeout = setTimeout(()=>{
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
        popper_dim(){
            return this.popupO.getBoundingClientRect();
        },
        resized(){
            //console.log(window.scrollY);
            if(this.is_showing){
                //find the new coordinates
                this.show();
            }
        }
    },
    mounted(){
        //console.log(this.$slots.default[0].elm);
        this.original_type = this.type;

        this.popupO = this.$refs['popupcontent']
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
                console.log('has target',this.target);
            }
        }
        //console.log(this.popupO);

        if(this.type=='tooltip'){
            //we do not need these handlers for simple dialog
            this.setupHandlers();
        }
        window.addEventListener('resize',this.resized)
    },
    destroy(){
        this.removeHandlers();
        window.removeEventListener('resize',this.resized)
    }
}
</script>