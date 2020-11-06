<template>
    <span >
        <slot name="default"></slot>
        <div ref="popupcontent" :style="{'display':'none',width:'auto','position':'absolute','max-width':max_width,'min-width':min_width,'left':popup_left+'px','top':popup_top+'px','visibility':'hidden','opacity':popup_opacity,'transition':'0.5s'}">
            <span class="popper-caret-bg" :style="{width:0,height:0,borderLeft:'9px solid transparent',borderRight:'9px solid transparent',borderBottom:'9px solid '+border_color,'left':(popup_width)-9+'px','position':'absolute','top':'-8px'}"></span>
            <span class="popper-caret" :style="{width:0,height:0,borderLeft:'7px solid transparent',borderRight:'7px solid transparent',borderBottom:'7px solid '+caret_bg_color,'left':(popup_width)-7+'px','position':'absolute','top':'-6px'}"></span>
            <div class="popper-container" :style="{'border-color':border_color,'border-style':'solid',borderWidth:'1px','border-radius':'10px'}">
                <div class="popper-header" :style="{'display':has_header?'block':'none','background-color':header_bg_color,'border-radius':'10px 10px 0px 0px', padding:'5px'}">
                    <slot name="title">{{title}}</slot>
                </div>
                <div class="popper-content" :style="{'background-color':content_bg_color,'padding':'5px','border-radius':'10px'}">
                    <slot name="content">
                        <div v-html="content"></div>
                    </slot>
                </div>
            </div>
            
        </div><!--popupcontent-->
    </span>
</template>
<script>
export default{
    props:{
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
        content_bg_color:{
            required:false,
            type:String,
            default:'#fff'
        },
        border_color:{
            required:false,
            type:String,
            default:'#afafaf'
        }
    },
    computed:{
        has_header:function(){
            return this.title!='' || (typeof this.$slots.title!=='undefined' && this.$slots.title.length>0)?true:false;
        },
        caret_bg_color:function(){
            var bg_color = this.content_bg_color;
            if(this.has_header){
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
            popup_left:'0px',
            popup_top:'0px',
            popup_opacity:0,
            popup_width:0
        }
    },
    methods:{
        setupHandlers(){
            if(this.dsDom!=null){
                var me = this;
                this.dsDom.addEventListener('focus',()=>{
                    me.show();
                })
                this.dsDom.addEventListener('mouseover',()=>{
                    me.show();
                })
                this.dsDom.addEventListener('blue',()=>{
                    me.hide()
                })
                this.dsDom.addEventListener('mouseout',()=>{
                    me.hide();
                })
            }
        },
        
        removeHandlers(){

        },
        show(){
            var target_dim = this.target_dim();
            
            //console.log(this.popupO);
            //console.log(this.popupO.style);
            //this.popupO.style.opacity = 0;
            this.popupO.style.visibility = 'visible';
            this.popupO.style.display='inline-block';

            //measure after we set display to inline-block because in hidden it can report wrongly
            var popper_dim = this.popper_dim();

            this.popup_left = target_dim.left;
            this.popup_top = target_dim.top+target_dim.height+10;
            this.popupO.style.visibility = 'visible';
            //this.popupO.style.transition='0.5s';
            this.popup_width = popper_dim.width/2;
            //console.log(popper_dim);
            this.popup_opacity = 1;

        },
        hide(){
            this.popup_opacity = 0;
           
            setTimeout(()=>{
                 this.popupO.style.visibility = 'hidden';
                this.popup_display='none';
                },500);
        },
        target_dim(){
            return this.dsDom.getBoundingClientRect();
        },
        popper_dim(){
            return this.popupO.getBoundingClientRect();
        }
    },
    mounted(){
        //console.log(this.$slots.default[0].elm);
        this.dsDom = this.$slots.default[0].elm
        this.popupO = this.$refs['popupcontent']
        document.body.appendChild( this.popupO );
        //console.log(this.popupO);
        this.setupHandlers();
    },
    destroy(){
        this.removeHandlers();
    }
}
</script>