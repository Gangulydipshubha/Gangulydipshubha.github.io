<template>
  <div>
    <input v-model="expression" placeholder="Enter Expression" class="box"/>

    <div class="buttons">
      <button @click="convertToPostfix">Infix ➝ Postfix</button>
      <button @click="convertToPrefix">Infix ➝ Prefix</button>
      <button @click="evaluatePostfix">Evaluate Postfix</button>
      <button @click="evaluatePrefix">Evaluate Prefix</button>
    </div>

    <h2>{{ message }}</h2>

    <div class="stack-area">
      <transition-group name="stack" tag="div">
        <div v-for="(item, i) in stack" :key="item+Math.random()" class="stack-box">
          {{ item }}
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expression: "",
      stack: [],
      message: ""
    };
  },

  methods: {
    precedence(op){
      if(op==='+'||op==='-') return 1;
      if(op==='*'||op==='/') return 2;
      if(op==='^') return 3;
      return 0;
    },

    async animatePush(x){
      this.stack.push(x);
      await new Promise(r=>setTimeout(r,950));
    },

    async animatePop(){
      this.stack.pop();
      await new Promise(r=>setTimeout(r,950));
    },

    async convertToPostfix(){
      this.stack=[];
      this.message="Converting to Postfix...";
      let s=[];
      let out="";
      const exp=this.expression.replace(/\s/g,'');

      for(let ch of exp){
        if(/[A-Za-z0-9]/.test(ch)){
          out+=ch;
        }
        else if(ch==='('){
          await this.animatePush(ch);
          s.push(ch);
        }
        else if(ch===')'){
          while(s.length && s[s.length-1] !== '('){
            out+=s.pop();
            await this.animatePop();
          }
          s.pop();
          await this.animatePop();
        }
        else {
          while(s.length && this.precedence(s[s.length-1])>=this.precedence(ch)){
            out+=s.pop();
            await this.animatePop();
          }
          s.push(ch);
          await this.animatePush(ch);
        }
      }

      while(s.length){
        out+=s.pop();
        await this.animatePop();
      }

      this.message="Postfix = " + out;
    },

    async convertToPrefix(){
      this.message="Converting to Prefix...";
      let rev = this.expression.split("").reverse().join("");
      rev = rev.replace(/\(/g,"temp").replace(/\)/g,"(").replace(/temp/g,")");
      this.expression = rev;

      await this.convertToPostfix();

      this.message="Prefix = " +
        this.message.replace("Postfix = ","").split("").reverse().join("");
    },

    async evaluatePostfix(){
      this.message="Evaluating Postfix...";
      this.stack=[];
      let s=[];
      for(let ch of this.expression){
        if(/[0-9]/.test(ch)){
          s.push(parseInt(ch));
          await this.animatePush(ch);
        } else {
          let b=s.pop(), a=s.pop();
          await this.animatePop();
          await this.animatePop();
          let r = eval(a+ch+b);
          s.push(r);
          await this.animatePush(r);
        }
      }
      this.message="Result = "+s[0];
    },

    async evaluatePrefix(){
      this.message="Evaluating Prefix...";
      this.stack=[];
      let s=[];
      let exp=[...this.expression].reverse();

      for(let ch of exp){
        if(/[0-9]/.test(ch)){
          s.push(parseInt(ch));
          await this.animatePush(ch);
        } else {
          let a=s.pop(), b=s.pop();
          await this.animatePop();
          await this.animatePop();
          let r=eval(a+ch+b);
          s.push(r);
          await this.animatePush(r);
        }
      }
      this.message="Result = "+s[0];
    }
  }
};
</script>

<style>
.box{
  padding:10px;
  font-size:18px;
  width:400px;
}
.buttons button{
  padding:10px;
  margin:8px;
  font-size:16px;
  cursor:pointer;
}
.stack-area{
  margin-top:30px;
  display:flex;
  gap:10px;
}
.stack-box{
  padding:15px;
  width:70px;
  text-align:center;
  background:#38bdf8;
  color:black;
  font-weight:700;
  border-radius:10px;
}
.stack-enter-active,.stack-leave-active{
  transition:0.6s;
}
.stack-enter{
  transform:translateY(40px);
  opacity:0;
}
.stack-leave-to{
  transform:translateY(-40px);
  opacity:0;
}
</style>
