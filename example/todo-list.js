/**
 * Created by dongfuqiang on 2017/7/21.
 */
var store={
    save(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    fetch2(key){
        return JSON.parse(localStorage.getItem(key)) || [];
    }
};
var list=store.fetch2('hello2');
// console.log(list);
var vm=new Vue({
    el:".main",
    data:{
        list:list,
        /*
            {
                title:'吃饭睡觉',
                checked : false
            }
        ],*/
        todo:'',
        edtorTodo :'',       //正在编辑的内容
        visibility:'all'
    },
    watch:{
        list:{
            handler(){
                store.save('hello2',this.list);
            },
            deep:true
        }
         /*list(){
             store.save('hello2',this.list);
         }*/
    },
    computed:{
        checkedLength(){
            return this.list.filter(function(item){
                return !item.checked
            }).length
        },
        filterHash(){
            var filter={
                all:function(list){
                    return list;
                },
                unfinished:function(list){
                    return list.filter(function(item){
                        return !item.checked
                    })
                },
                finished:function(list){
                    return list.filter(function(item){
                        return item.checked
                    })
                }
            };
            return filter[this.visibility](list);
        }
    },
    methods:{
        addTodos(){
            this.list.push({title:this.todo,checked:false});
            this.todo='';
        },
        deleteTodo(todo){
            var index=this.list.indexOf(todo);
            this.list.splice(index,1);
        },
        //正在编辑
        edtor(todo){
            this.edtorTodo=todo;
        },
        //编辑完成
        edtored(todo){
            this.edtorTodo=''
        },
        cancelEdtor(todo){

        }
    },
    directives:{
        'focus':{
            update(el,binding){
                if(binding.value){
                    el.focus();
                }
            }
        }
    }
});
function watchHashChange(){
    var hash=window.location.hash.slice(1);
    vm.visibility=hash;
    // console.log(hash)
}
watchHashChange();
window.addEventListener('hashchange', watchHashChange);