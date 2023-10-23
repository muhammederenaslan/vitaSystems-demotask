<!doctype html>
<html class="fixed">

<!-- Mirrored from www.okler.net/previews/porto-admin/3.1.0/layouts-default.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 16 Mar 2021 18:17:40 GMT -->

<head>

	<meta charset="UTF-8">
	<title>Book Shop</title>
	<meta name="keywords" content="HTML5 Admin Template" />
	<meta name="description" content="">
	<meta name="author" content="">

	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />

	<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800|Shadows+Into+Light"
		rel="stylesheet" type="text/css">


    @yield('page-css')



</head>

<body>
	<section class="body">

        @include('admin.blocks.header')

		<div class="inner-wrapper">

			@include('admin.blocks.left-side')

			<section role="main" class="content-body">

                @yield('content')

			</section>
		</div>
	</section>

    @yield('page-js')
    <!-- Start of LiveChat (www.livechat.com) code -->
    <script>
        window.__lc = window.__lc || {};
        window.__lc.license = 16144491;
        ; (function (n, t, c) { function i(n) { return e._h ? e._h.apply(null, n) : e._q.push(n) } var e = { _q: [], _h: null, _v: "2.0", on: function () { i(["on", c.call(arguments)]) }, once: function () { i(["once", c.call(arguments)]) }, off: function () { i(["off", c.call(arguments)]) }, get: function () { if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load."); return i(["get", c.call(arguments)]) }, call: function () { i(["call", c.call(arguments)]) }, init: function () { var n = t.createElement("script"); n.async = !0, n.type = "text/javascript", n.src = "https://cdn.livechatinc.com/tracking.js", t.head.appendChild(n) } }; !n.__lc.asyncInit && e.init(), n.LiveChatWidget = n.LiveChatWidget || e }(window, document, [].slice))
    </script>
    <noscript>
        <a href="https://www.livechat.com/chat-with/16144491/" rel="nofollow">Chat with us</a>
        , powered by <a href="https://www.livechat.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a>
    </noscript>
    <!-- End of LiveChat code -->


</body>

<!-- Mirrored from www.okler.net/previews/porto-admin/3.1.0/layouts-default.html by HTTrack Website Copier/3.x [XR&CO'2014], Tue, 16 Mar 2021 18:19:11 GMT -->

</html>
