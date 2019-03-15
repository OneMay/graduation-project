
  const moment = require('moment')
  function currying(func, args = []) {
        let arity = func.length;
    
        return function (..._args) {
            _args.unshift(...args);
    
            if(_args.length < arity) {
                return currying(func, _args);
            }
    
            return func(..._args);
        }
    }
    function  add(arg1, arg2) {
        var r1, r2, m, c;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2));
        if (c > 0) {
            var cm = Math.pow(10, c);
            if (r1 > r2) {
                arg1 = Number(arg1.toString().replace(".", ""));
                arg2 = Number(arg2.toString().replace(".", "")) * cm;
            } else {
                arg1 = Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Number(arg2.toString().replace(".", ""));
            }
        } else {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m;
    }
    function sub(arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2)); 
        n = (r1 >= r2) ? r1 : r2;
        return parseFloat(((arg1 * m - arg2 * m) / m).toFixed(n));
    
    }
    function  div(arg1, arg2) {
        let arg =arg2;
        arg2=arg1;
        arg1=arg;
        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
        }
        with (Math) {
            r1 = Number(arg1.toString().replace(".", ""));
            r2 = Number(arg2.toString().replace(".", ""));
            return (r1 / r2) * pow(10, t2 - t1);
        }
    }
    function  mul(arg1, arg2) {
        let arg =arg2;
        arg2=arg1;
        arg1=arg;
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        }
        catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        }
        catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    }

      function round(num, decimal) {
        if (isNaN(num)) {
            return 0;
        }
        const p1 = Math.pow(10, decimal + 1);
        const p2 = Math.pow(10, decimal);
        return Math.round(num * p1 / 10) / p2;
    }
     
    function toDecimal( decimal,num) {
        return round(num, decimal).toFixed(decimal);
    }
      let compose = (...funcArgs) => (...args) => {
        let [...funcArgsCopy] = funcArgs;
        let funced = (...func) => {
          if (funcArgsCopy.length === 0) return func[0];
          func = funcArgsCopy.pop()(...func);
          return funced(func);
        }
        return funced(...args);
      }
      let pipe = (...funcArgs) => compose(...funcArgs.reverse());

      function arrPushByTime(num,time){
          let timeArr = []
          for(let i = 0;i<num;i++){
              timeArr.push(moment(time).subtract(i, 'days').format("YYYY-MM-DD"))
          }

          return timeArr.reverse();
      }
     module.exports = {
        currying:currying,
        curryAdd:currying(add),
        currySub:currying(sub),
        curryMul:currying(mul),
        curryDiv:currying(div),
        currytoDecimal:currying(toDecimal),
        compose :compose,
        curryArrPushByTime:currying(arrPushByTime)
     }  
