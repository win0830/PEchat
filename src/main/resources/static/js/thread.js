var resesParam;
var sendMessageParam;
var cateParam;

$(function(){
	$('#open_create_threads').on('click', function(){
		$('.create_threads, .create_threads_mask').show();
	});
	$('.create_threads_mask').on('click', function(){
		$('.create_threads, .create_threads_mask').hide();
	});

	$('#send_message').on('click', send_message);
	$('.cal').datepicker();

	getReses();
	
	//DB内データの受け取り(カテゴリ表) 
	cateParams = {
	        url: "getCategories",
	        dataType: "json",
	        type: "get",
	        contentType: "application/json"
	    };

	$.ajax(cateParams)
	.done(function(data,status,jqXHR){
	  //テーブルに受け取った値を表示
	    for(var i=0; i < data.length ; i++){
	    	if(i==0){
		    	$('select').append('<option value="' + data[i].categoryId + '" selected>' + data[i].categoryName + '</option>');
	    	}else{
		    	$('select').append('<option value="' + data[i].categoryId + '">' + data[i].categoryName + '</option>');

	    	}
	    }
	    $('select').append('<option value="null">＋追加</option>');
	    
	  //selectの値を取得
		$('select').change(function(){
			
			var n = $('select').val();
			if(n=="null"){
				$('#add_category').show();
				
			}else{
				$('#add_category').hide();
			}
		});
	
	})
	.fail(function(jqXHR,status,errThrown){
	    console.error("Error:" + status);
	});


});


$('#send_message').on('click', send_message);

function send_message(){
	var boolean = $('.form-check-input').prop('checked');
	var num;
	if(boolean == true){
		num = 1;
	}else{
		num = 0;
	}
	var text = $('#msg').val();
	var id = Number($('#threadId').text());
	sendMessageParam = {
		url: "sendMessage",
		dataType: "json",
		type: "post",
		contentType: "application/json",
		data: {
			isOpenName : num,
		  	res : text,
		  	threadId : id,
		}
	}
	
	sendMessageParam.data = JSON.stringify(sendMessageParam.data);

	$.ajax(sendMessageParam)
	.done(function(data,status,jqXHR){
		$('.reses_list').empty();
		$('#msg').val('');
		getReses();
	})
	.fail(function(jqXHR,status,errThrown){
	    console.error(jqXHR);
	});
	
	

}


//全レス取得表示
function getReses(){	
	//DB内データの受け取り 
	resesParam = {
	        url: "getReses",
	        dataType: "json",
	        type: "get",
	        contentType: "application/json",
	        data: {
	        	threadId : $('#threadId').html()
	        }
	};

	$.ajax(resesParam)
	.done(function(data,status,jqXHR){
	  //テーブルに受け取った値を表示
	    for(var i = 0 ; i < data.length ; i++){
	    	console.log(data[i]);
	    	$('.reses_list').append(
	    		'<li class="list-group-item">' + (i+1) + '：' 
	    		+ (data[i].isOpenName == 0 ? data[i].users.userName : '名無し')
	    		+ '&nbsp;' + data[i].postTime.date.year + '/' + data[i].postTime.date.month + '/' + data[i].postTime.date.day + ' ' 
	    		+ data[i].postTime.time.hour + ':' + data[i].postTime.time.minute + ':' + data[i].postTime.time.second
	    		+ '<br>&nbsp;' + data[i].res + '</li>'
	    	);
	    }
	})
	.fail(function(jqXHR,status,errThrown){
	    console.error(jqXHR);
	});
}



	