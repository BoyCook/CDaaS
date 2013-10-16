var model = {
    msg: {
        type: 'String'
    },
    css: {
        type: 'String'
    },            
    warning: {
        type: 'JSON',
        model: ['amount', 'colour']
    },
    overflow: {
        type: 'Boolean'
    },
    tick: {
        type: 'Boolean'
    },
    discreet: {
        type: 'Boolean'
    }
};

function buildParamInput(sel) {
    var type = model[sel];
    if (type.type === "String") {
        $('.param-values').html(buildStringInput(sel));
    } else if (type.type === "Boolean") {
        $('.param-values').html(buildBooleanInput(sel));
    }
}

function buildStringInput(name) {
    return "<input type=\"text\" class=\"" + name + "\" />";
}

function buildBooleanInput(name) {
    return "<label>true</label>" +
           "<input type=\"radio\" name=\"" + name + "\" value=\"true\">" +
           "<label>false</label>" +
           "<input type=\"radio\" name=\"" + name + "\" value=\"false\">";
}

function go() {
    var href = $('.action').val() + $('.amount').val();
    var event = $('.event').val();
    if (event && event.length > 0) {
        href += '/for/' + event;
    }
    document.location.href = href;
}

$(document).ready(function () {
    $('.amount').keyup(function (e) {
        if (e.keyCode === 13) {
            go();
        }
    });            
    $('#go').click(function() {
        go();
    });
    $('.action').change(function(){
        var action = $('.action').val();
        if (action === '/from/') {
            $('.amount').val('180');
            $('.event').val('Egg boiled');
        } else if (action === '/to/') {
            $('.amount').val('20131225');
            $('.event').val('Christmas');
        } else if (action === '/up/') {                    
            $('.amount').val('300');
            $('.event').val('Bed time');
        }
    });
    $('.params').change(function(){
        buildParamInput($('.params').val());
    });
});
