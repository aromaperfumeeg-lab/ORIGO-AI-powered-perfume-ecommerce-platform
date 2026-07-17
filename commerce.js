(() => {
  const store = window.ORIGOStore;
  if (!store) return;
  const root = document.querySelector("#commerce-root");
  const page = document.querySelector("#commerce-page");
  const homeChildren = [...document.querySelectorAll("#storefront-main > *:not(#commerce-page)")];
  const initialHidden = new Map(homeChildren.map((node) => [node, node.hidden]));
  const model = {
    bootstrap: null, quote: null, stage: 1, couponCode: "", address: {}, paymentMethod: "cod",
    order: null, accessToken: "", feedback: null, survey: null, analytics: null, loading: false
  };
  const esc = store.escapeHTML || ((value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char])));
  const ar = () => document.documentElement.lang !== "en";
  const t = (arabic, english) => ar() ? arabic : english;
  const money = (value) => `${new Intl.NumberFormat(ar() ? "ar-EG" : "en-EG", { maximumFractionDigits: 2 }).format(Number(value || 0))} ${t("جنيه", "EGP")}`;
  const date = (value, withTime = false) => value ? new Intl.DateTimeFormat(ar() ? "ar-EG" : "en-GB", { dateStyle: "medium", ...(withTime ? { timeStyle: "short" } : {}) }).format(new Date(value)) : "";
  const api = store.api;
  const icon = (name) => {
    const paths = {
      cart:'<path d="M4 5h2l1.7 9h9.5l2-6H7"/><circle cx="10" cy="19" r="1"/><circle cx="17" cy="19" r="1"/>',
      truck:'<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
      shield:'<path d="M12 3 4.5 6v5.5c0 4.7 3.2 7.8 7.5 9.5 4.3-1.7 7.5-4.8 7.5-9.5V6z"/><path d="m9 12 2 2 4-5"/>',
      return:'<path d="M8 7H4V3"/><path d="M4.5 7a8 8 0 1 1-1 7"/>',
      support:'<path d="M4 13v-2a8 8 0 0 1 16 0v2"/><path d="M4 12H2v5h4v-5zM20 12h2v5h-4v-5zM18 19c-1 1-3 2-5 2"/>',
      gift:'<path d="M3 10h18v11H3zM2 6h20v4H2zM12 6v15"/><path d="M12 6c-3 0-5-1-5-3 0-1 1-2 2-2 2 0 3 3 3 5Zm0 0c3 0 5-1 5-3 0-1-1-2-2-2-2 0-3 3-3 5Z"/>',
      check:'<path d="m5 12 4 4L19 6"/>', box:'<path d="m4 7 8-4 8 4-8 4zM4 7v10l8 4 8-4V7M12 11v10"/>',
      card:'<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 9h20M6 15h4"/>',
      pin:'<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      star:'<path d="m12 2 3 6 7 .9-5 4.8 1.3 7-6.3-3.3-6.3 3.3 1.3-7-5-4.8L9 8z"/>'
    };
    return `<svg class="commerce-icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name] || paths.check}</svg>`;
  };

  function accessKey(orderNumber) { return `origoOrderAccess:${orderNumber}`; }
  function setRoute(active) {
    document.body.classList.toggle("commerce-route", active);
    page.hidden = !active;
    if (active) homeChildren.forEach((node) => { node.hidden = true; });
    else {
      const anotherRoute = ["account-route", "finder-route", "notes-route", "catalog-route", "benefit-route"].some((name) => document.body.classList.contains(name));
      if (!anotherRoute) homeChildren.forEach((node) => { node.hidden = Boolean(initialHidden.get(node)); });
      root.innerHTML = "";
    }
  }
  function go(path, replace = false) {
    history[replace ? "replaceState" : "pushState"]({ commerce: true }, "", path);
    route();
  }
  function errorCard(message) {
    return `<div class="commerce-message error"><b>${t("تعذر إكمال العملية", "We couldn't complete this action")}</b><p>${esc(message)}</p><a href="/" data-commerce="home">${t("العودة إلى المتجر", "Back to store")}</a></div>`;
  }
  async function bootstrap() {
    const data = await api("/api/checkout/bootstrap");
    model.bootstrap = data;
    const local = store.state.cart || [];
    if (local.length) {
      const synced = await api("/api/checkout/cart", { method: "POST", body: JSON.stringify({ cart: local }) });
      store.state.cart = synced.cart;
      localStorage.setItem("origoCart", JSON.stringify(synced.cart));
      store.renderCart();
    } else if (data.cart?.length) {
      store.state.cart = data.cart;
      localStorage.setItem("origoCart", JSON.stringify(data.cart));
      store.renderCart();
    }
    return data;
  }
  async function quote(extra = {}) {
    model.quote = (await api("/api/checkout/quote", { method: "POST", body: JSON.stringify({
      couponCode: model.couponCode, governorateId: model.address.governorateId, areaId: model.address.areaId, ...extra
    }) })).quote;
    return model.quote;
  }
  function checkoutSteps() {
    const labels = [["سلة التسوق","Cart"],["بيانات التوصيل والشحن","Delivery"],["الدفع","Payment"],["تأكيد الطلب","Confirmation"]];
    return `<nav class="checkout-steps" aria-label="${t("خطوات إتمام الطلب","Checkout steps")}">${labels.map((label,index)=>`<div class="${model.stage===index+1?"active":""} ${model.stage>index+1?"done":""}"><span>${model.stage>index+1?"✓":index+1}</span><b>${t(...label)}</b></div>`).join("")}</nav>`;
  }
  function trustBar() {
    return `<div class="commerce-trust">${[
      ["shield","منتجات أصلية 100%","100% authentic"],["return","استرجاع سهل خلال 14 يوم","Easy 14-day returns"],
      ["support","دعم عملاء 24/7","24/7 support"],["truck","شحن سريع وموثوق","Fast, reliable delivery"],["card","دفع آمن","Secure payment"]
    ].map(([i,a,e])=>`<div>${icon(i)}<span><b>${t(a,e)}</b><small>${i==="truck"?t("خلال 2–3 أيام عمل","Within 2–3 business days"):t("نحن دائمًا معك","Always here for you")}</small></span></div>`).join("")}</div>`;
  }
  function itemRows(editable = false) {
    return `<div class="checkout-items">${model.quote.items.map(item=>`<article class="checkout-line">
      <img src="${esc(item.image || "assets/origo-hero.png")}" alt=""/><div class="checkout-line-copy"><b>${esc(ar()?item.nameAr:item.nameEn||item.nameAr)}</b><small>${esc(item.concentration)}${item.size?` · ${esc(item.size)}`:""}</small><span class="stock-ok">${t("متوفر","In stock")}</span></div>
      ${editable?`<div class="checkout-qty"><button data-commerce="qty" data-id="${esc(item.productId)}" data-delta="-1">−</button><b>${item.quantity}</b><button data-commerce="qty" data-id="${esc(item.productId)}" data-delta="1">＋</button><button class="save" data-commerce="save-later" data-id="${esc(item.productId)}">♡ ${t("حفظ لاحقًا","Save")}</button></div>`:"<b>× "+item.quantity+"</b>"}
      <strong>${money(item.lineTotal)}</strong></article>`).join("")}</div>`;
  }
  function summary() {
    const q=model.quote;
    return `<aside class="checkout-summary-card"><h2>${t("ملخص الطلب","Order summary")}</h2>${itemRows(false)}<dl>
      <div><dt>${t("الإجمالي الفرعي","Subtotal")}</dt><dd>${money(q.subtotal)}</dd></div>
      ${q.productDiscount?`<div class="discount"><dt>${t("خصم المنتجات","Product discount")}</dt><dd>− ${money(q.productDiscount)}</dd></div>`:""}
      ${q.couponDiscount?`<div class="discount"><dt>${t("خصم الكوبون","Coupon discount")} (${esc(q.couponCode)})</dt><dd>− ${money(q.couponDiscount)}</dd></div>`:""}
      <div><dt>${t("رسوم الشحن","Shipping")}</dt><dd>${q.shipping?money(q.shipping):t("مجاني","Free")}</dd></div>
      <div class="grand"><dt>${t("الإجمالي الكلي","Grand total")}</dt><dd>${money(q.total)}</dd></div></dl>
      <div class="loyalty">${icon("gift")}<span>${t("ستحصل على","You'll earn")} <b>${q.loyaltyPoints}</b> ${t("نقطة ORIGO","ORIGO points")}</span></div></aside>`;
  }
  function benefitSide() {
    return `<aside class="checkout-why"><h2>${t("لماذا تتسوق من ORIGO؟","Why shop with ORIGO?")}</h2>${[
      ["shield","منتجات أصلية 100%","100% authentic products"],["truck","شحن سريع وموثوق","Fast, reliable delivery"],
      ["return","استرجاع سهل خلال 14 يوم","Easy returns within 14 days"],["support","دعم عملاء 24/7","24/7 customer support"],["card","دفع آمن 100%","100% secure payment"]
    ].map(([i,a,e])=>`<div>${icon(i)}<span><b>${t(a,e)}</b><small>${t("خدمة موثوقة ومصممة لراحتك","Trusted service designed for you")}</small></span></div>`).join("")}</aside>`;
  }
  function freeShippingProgress() {
    const q=model.quote,pct=Math.min(100,Math.max(0,(q.freeShippingThreshold-q.amountToFreeShipping)/q.freeShippingThreshold*100));
    return `<div class="shipping-progress ${q.freeShipping?"reached":""}"><b>${q.freeShipping?t("تهانينا! حصلت على شحن مجاني","You unlocked free shipping"):t(`أنت على بعد ${money(q.amountToFreeShipping)} من الشحن المجاني`,`You're ${money(q.amountToFreeShipping)} away from free shipping`)}</b><div><span style="width:${pct}%"></span></div><small>${money(q.freeShippingThreshold-q.amountToFreeShipping)} / ${money(q.freeShippingThreshold)}</small></div>`;
  }
  async function renderCartStage() {
    model.stage=1; await quote();
    root.innerHTML=`${checkoutSteps()}<header class="commerce-title"><h1>${t("سلة التسوق","Shopping cart")} <small>(${model.quote.items.length} ${t("منتجات","items")})</small></h1></header>
      <div class="checkout-layout cart-layout"><section class="checkout-main-card">${freeShippingProgress()}${itemRows(true)}
        <div class="cart-tools"><button data-commerce="clear-cart">⌫ ${t("إفراغ السلة","Clear cart")}</button><button onclick="window.print()">▣ ${t("طباعة السلة","Print cart")}</button></div>
        <div class="coupon-box"><label><b>${t("كوبون الخصم","Discount coupon")}</b><span><input id="checkout-coupon" value="${esc(model.couponCode)}" placeholder="${t("أدخل كود الكوبون","Enter coupon code")}"/><button data-commerce="apply-coupon">${t("تطبيق","Apply")}</button></span></label>${model.quote.couponCode?`<p class="success">✓ ${t("تم تطبيق الكوبون بنجاح","Coupon applied successfully")}</p>`:""}</div>
      </section>${summary()}</div><div class="checkout-actions"><a href="/perfumes" data-commerce="home">← ${t("متابعة التسوق","Continue shopping")}</a><button class="primary" data-commerce="next-delivery">${t("إتمام الطلب","Checkout")} ${icon("shield")}</button></div>${trustBar()}`;
  }
  function selectedAreaOptions() {
    const locations=model.bootstrap.locations.filter(g=>g.active);const gov=locations.find(g=>Number(g.id)===Number(model.address.governorateId));
    return {locations,areas:(gov?.areas||[]).filter(a=>a.active)};
  }
  async function renderDeliveryStage() {
    model.stage=2; await quote(); const {locations,areas}=selectedAreaOptions(); const user=model.bootstrap.user||{};
    root.innerHTML=`${checkoutSteps()}<div class="checkout-layout three"><form class="checkout-main-card delivery-form" id="delivery-form"><h1>${t("بيانات العميل والتوصيل","Customer & delivery details")}</h1>
      ${model.bootstrap.savedAddresses?.length?`<label class="wide"><span>${t("العناوين المحفوظة","Saved addresses")}</span><select id="saved-address"><option value="">${t("استخدم عنوانًا جديدًا","Use a new address")}</option>${model.bootstrap.savedAddresses.map(a=>`<option value="${a.id}">${esc(a.label)} — ${esc(a.streetAddress)}</option>`).join("")}</select></label>`:""}
      <div class="field-grid"><label><span>${t("الاسم الأول","First name")} *</span><input name="firstName" required minlength="2" value="${esc(model.address.firstName||user.name?.split(" ")[0]||"")}"/></label><label><span>${t("الاسم الأخير","Last name")} *</span><input name="lastName" required minlength="2" value="${esc(model.address.lastName||user.name?.split(" ").slice(1).join(" ")||"")}"/></label>
      <label class="wide"><span>${t("رقم الموبايل المصري","Egyptian mobile number")} *</span><div class="phone-field"><b>+20</b><input name="phone" inputmode="tel" required value="${esc((model.address.phone||user.phone||"").replace(/^\+20/,"0"))}" placeholder="010 1234 5678"/></div></label>
      <label class="wide"><span>${t("البريد الإلكتروني (اختياري)","Email (optional)")}</span><input name="email" type="email" value="${esc(model.address.email||user.email||"")}"/></label>
      <label><span>${t("المحافظة","Governorate")} *</span><select name="governorateId" required><option value="">${t("اختر المحافظة","Choose governorate")}</option>${locations.map(g=>`<option value="${g.id}" ${Number(g.id)===Number(model.address.governorateId)?"selected":""}>${esc(ar()?g.nameAr:g.nameEn)}</option>`).join("")}</select></label>
      <label><span>${t("المنطقة / الحي","Area / district")} *</span><select name="areaId" required ${areas.length?"":"disabled"}><option value="">${t("اختر المنطقة","Choose area")}</option>${areas.map(a=>`<option value="${a.id}" ${Number(a.id)===Number(model.address.areaId)?"selected":""}>${esc(ar()?a.nameAr:a.nameEn)}</option>`).join("")}</select></label>
      <label class="wide"><span>${t("العنوان التفصيلي","Detailed address")} *</span><input name="streetAddress" required minlength="8" value="${esc(model.address.streetAddress||"")}" placeholder="${t("الشارع، الحي، وأقرب علامة مميزة","Street, district and nearest landmark")}"/></label>
      <label><span>${t("رقم المبنى","Building")}</span><input name="building" value="${esc(model.address.building||"")}"/></label><label><span>${t("الدور / الشقة","Floor / apartment")}</span><input name="floorApartment" value="${esc([model.address.floor,model.address.apartment].filter(Boolean).join(" / "))}"/></label>
      <label class="wide"><span>${t("علامة مميزة","Landmark")}</span><input name="landmark" value="${esc(model.address.landmark||"")}"/></label></div>
      ${model.bootstrap.user?`<label class="save-address"><input type="checkbox" name="saveAddress"/> ${t("حفظ هذا العنوان لاستخدامه لاحقًا","Save this address for later")}</label>`:""}
      <section class="shipping-method"><h2>${t("طريقة الشحن","Shipping method")}</h2><label><input type="radio" checked name="shippingMethod" value="origo_delivery"/>${icon("truck")}<span><b>${t("توصيل ORIGO","ORIGO delivery")}</b><small>${t(`التوصيل خلال ${model.quote.shippingMethod.minDays}–${model.quote.shippingMethod.maxDays} أيام عمل`,`Delivery within ${model.quote.shippingMethod.minDays}–${model.quote.shippingMethod.maxDays} business days`)}</small></span><strong>${model.quote.shipping?money(model.quote.shipping):t("مجاني","Free")}</strong></label></section>
      <p class="commerce-inline-error" id="delivery-error"></p><button class="primary wide-button" type="submit">${t("متابعة إلى الدفع","Continue to payment")} ←</button></form>${summary()}${benefitSide()}</div>`;
  }
  function renderPaymentStage() {
    model.stage=3; const methods=model.quote.paymentMethods;
    root.innerHTML=`${checkoutSteps()}<div class="checkout-layout three"><form class="checkout-main-card payment-form" id="payment-form"><h1>${t("اختر طريقة الدفع","Choose payment method")}</h1><p>${t("لن نطلب بيانات دفع إلا عبر مزود الدفع المفعّل والآمن.","Payment details are only collected by the enabled secure provider.")}</p>
      <div class="payment-methods">${methods.map(method=>`<label class="${model.paymentMethod===method.code?"selected":""}"><input type="radio" name="paymentMethod" value="${method.code}" ${model.paymentMethod===method.code?"checked":""}/>${icon(method.code==="cod"?"box":"card")}<span><b>${esc(ar()?method.nameAr:method.nameEn)}</b><small>${method.code==="cod"?t("ادفع نقدًا عند استلام الطلب","Pay when your order arrives"):t("بطاقة أو محفظة إلكترونية عبر Paymob","Card or wallet via Paymob")}</small></span></label>`).join("")}</div>
      <label class="order-notes"><span>${t("ملاحظات الطلب (اختياري)","Order notes (optional)")}</span><textarea name="notes" maxlength="1000" placeholder="${t("أي تعليمات تساعدنا في تجهيز أو توصيل طلبك","Instructions for preparing or delivering your order")}"></textarea></label>
      <label class="terms"><input type="checkbox" required/> ${t("أوافق على سياسة الشحن والاسترجاع والشروط والأحكام","I agree to the shipping, returns and terms policies")}</label>
      <p class="commerce-inline-error" id="payment-error"></p><button class="primary wide-button" type="submit">${icon("shield")} ${t("تأكيد الطلب","Place order")} — ${money(model.quote.total)}</button></form>${summary()}${benefitSide()}</div>`;
  }

  async function updateCart(id, delta) {
    const cart=[...(store.state.cart||[])];const item=cart.find(row=>row.id===id);if(!item)return;item.quantity=Math.max(0,Math.min(10,item.quantity+delta));
    const result=await api("/api/checkout/cart",{method:"POST",body:JSON.stringify({cart:cart.filter(row=>row.quantity>0)})});store.state.cart=result.cart;localStorage.setItem("origoCart",JSON.stringify(result.cart));store.renderCart();
    if(!result.cart.length){go("/perfumes");store.showToast(t("أصبحت السلة فارغة","Your cart is now empty"));return;}await renderCartStage();
  }
  function formObject(form) { return Object.fromEntries(new FormData(form)); }
  function storeAddress(data) {
    const [floor="",apartment=""] = String(data.floorApartment||"").split("/").map(s=>s.trim());
    model.address={...model.address,...data,governorateId:Number(data.governorateId),areaId:Number(data.areaId),floor,apartment,saveAddress:Boolean(data.saveAddress)};
  }
  async function placeOrder(data) {
    if(model.loading)return;model.loading=true;const button=document.querySelector("#payment-form button[type=submit]");if(button)button.disabled=true;
    try{
      const result=await api("/api/checkout/order",{method:"POST",body:JSON.stringify({...model.address,...data,paymentMethod:model.paymentMethod,couponCode:model.couponCode,attribution:window.ORIGOTracking?.attribution?.()||{}})});
      model.order=result.order;model.accessToken=result.accessToken;localStorage.setItem(accessKey(result.order.orderNumber),result.accessToken);store.state.cart=[];localStorage.setItem("origoCart","[]");store.renderCart();window.ORIGOTracking?.purchase?.(result.order);
      if(result.order.paymentMethod==="paymob"){const payment=await api("/api/payments/paymob/intention",{method:"POST",body:JSON.stringify({orderId:result.order.id})});location.assign(payment.payment.checkoutUrl);return;}
      go(`/order/${encodeURIComponent(result.order.orderNumber)}`);
    }catch(error){document.querySelector("#payment-error").textContent=error.message;if(button)button.disabled=false;}finally{model.loading=false;}
  }

  const statuses=["received","processing","ready_to_ship","shipped","out_for_delivery","delivered"];
  const statusCopy={received:["تم استلام الطلب","Order received","تم استلام طلبك وسنبدأ مراجعته.","We received your order and will review it."],processing:["قيد التجهيز","Processing","نقوم حاليًا بتجهيز طلبك.","We are preparing your order."],ready_to_ship:["جاهز للشحن","Ready to ship","اكتمل تجهيز طلبك وأصبح جاهزًا للشحن.","Your order is ready to ship."],shipped:["تم الشحن","Shipped","تم شحن طلبك وهو في الطريق إليك.","Your order has shipped and is on its way."],out_for_delivery:["خرج للتسليم","Out for delivery","طلبك في طريقه إليك ضمن نافذة التسليم المسجلة.","Your order is on its way within the recorded delivery window."],delivered:["تم تسليم طلبك بنجاح!","Delivered successfully!","تم تسليم طلبك بنجاح. شكرًا لتسوقك معنا.","Your order was delivered successfully. Thank you."]};
  function orderTimeline(order) {
    const eventMap=new Map(order.timeline.filter(e=>statuses.includes(e.status)).map(e=>[e.status,e]));const currentIndex=statuses.indexOf(order.status);
    return `<div class="order-timeline">${statuses.map((status,index)=>{const event=eventMap.get(status),done=Boolean(event)||index<currentIndex,active=status===order.status;return `<div class="${done?"done":""} ${active?"active":""}"><span>${done?"✓":icon(status==="processing"?"box":status.includes("ship")||status==="out_for_delivery"?"truck":"check")}</span><b>${t(statusCopy[status][0],statusCopy[status][1])}</b>${event?`<small>${date(event.createdAt,true)}</small>`:""}</div>`;}).join("")}</div>`;
  }
  function orderItems(order){return `<div class="tracked-items">${order.items.map(item=>`<article><img src="${esc(item.image||"assets/origo-hero.png")}" alt=""/><span><b>${esc(item.productName)}</b><small>${esc(item.concentration)}${item.size?` · ${esc(item.size)}`:""}<br/>${item.quantity} × ${money(item.unitPrice)}</small></span><strong>${money(item.lineTotal)}</strong></article>`).join("")}</div>`;}
  function orderTotals(order){return `<dl class="tracked-totals"><div><dt>${t("الإجمالي الفرعي","Subtotal")}</dt><dd>${money(order.subtotal)}</dd></div>${order.productDiscount?`<div class="discount"><dt>${t("خصم المنتجات","Product discount")}</dt><dd>− ${money(order.productDiscount)}</dd></div>`:""}${order.couponDiscount?`<div class="discount"><dt>${t("خصم الكوبون","Coupon discount")}</dt><dd>− ${money(order.couponDiscount)}</dd></div>`:""}<div><dt>${t("رسوم الشحن","Shipping")}</dt><dd>${order.shipping?money(order.shipping):t("مجاني","Free")}</dd></div><div class="grand"><dt>${t("الإجمالي الكلي","Grand total")}</dt><dd>${money(order.total)}</dd></div></dl>`;}
  async function renderOrder(orderNumberValue) {
    model.stage=4;const token=localStorage.getItem(accessKey(orderNumberValue))||"";
    try{model.order=(await api(`/api/checkout/orders/${encodeURIComponent(orderNumberValue)}?accessToken=${encodeURIComponent(token)}`)).order;}catch(error){root.innerHTML=errorCard(error.message);return;}
    const o=model.order,copy=statusCopy[o.status]||statusCopy.received,isDelivered=o.status==="delivered";
    root.innerHTML=`${checkoutSteps()}<header class="tracking-heading"><small>${t("رقم الطلب","Order number")}</small><h1 dir="ltr">#${esc(o.orderNumber)}</h1><button data-commerce="copy-order" data-value="${esc(o.orderNumber)}">▣ ${t("نسخ الرقم","Copy")}</button></header>
      <section class="status-hero status-${esc(o.status)}">${icon(isDelivered?"check":o.status==="processing"?"box":o.status.includes("ship")||o.status==="out_for_delivery"?"truck":"check")}<div><h2>${t(copy[0],copy[1])}</h2><p>${t(copy[2],copy[3])}</p></div></section>
      <section class="timeline-card"><h2>${t("حالة الطلب","Order status")}</h2>${orderTimeline(o)}</section>
      <div class="tracking-grid"><section class="tracking-card"><h2>${t("تفاصيل الطلب","Order details")}</h2>${orderItems(o)}${orderTotals(o)}</section>
      <section class="tracking-card"><h2>${t("معلومات الشحنة","Shipment information")}</h2>${o.carrierName?`<dl><div><dt>${t("شركة التوصيل","Carrier")}</dt><dd>${esc(o.carrierName)}</dd></div>${o.trackingNumber?`<div><dt>${t("رقم التتبع","Tracking number")}</dt><dd dir="ltr">${esc(o.trackingNumber)}</dd></div>`:""}${o.shippedAt?`<div><dt>${t("تاريخ الشحن","Shipped at")}</dt><dd>${date(o.shippedAt,true)}</dd></div>`:""}</dl>${o.trackingUrl?`<a class="primary small" target="_blank" rel="noopener" href="${esc(o.trackingUrl)}">${t("تتبع الشحنة","Track shipment")}</a>`:""}`:`<p class="empty-shipment">${t("سيتم تحديث معلومات الشحنة عند تجهيزها.","Shipment details will appear when your order is prepared.")}</p>`}
      <h3>${t("عنوان التوصيل","Delivery address")}</h3><p>${esc([o.addressSnapshot?.streetAddress,o.addressSnapshot?.areaAr,o.addressSnapshot?.governorateAr].filter(Boolean).join("، "))}</p>
      <h3>${t("موعد التوصيل المتوقع","Estimated delivery")}</h3><p>${date(o.estimatedDeliveryFrom)} — ${date(o.estimatedDeliveryTo)}</p>
      ${o.courierName?`<h3>${t("مندوب التوصيل","Courier")}</h3><p>${esc(o.courierName)}${o.courierPhone?` · <a dir="ltr" href="tel:${esc(o.courierPhone)}">${esc(o.courierPhone)}</a>`:""}</p>`:""}</section>
      <section class="tracking-card payment-status"><h2>${t("الدفع والمكافآت","Payment & rewards")}</h2><p>${icon("card")}<span><b>${o.paymentMethod==="cod"?t("الدفع عند الاستلام","Cash on delivery"):"Paymob"}</b><small>${t("حالة الدفع","Payment status")}: ${esc(o.paymentStatus)}</small></span></p><p>${icon("gift")}<span>${t("نقاط متوقعة","Expected points")}: <b>${o.loyaltyPoints}</b></span></p></section></div>
      <div class="tracking-actions">${isDelivered?`<button class="primary" data-commerce="start-feedback">${icon("star")} ${t("قيّم تجربتك","Rate your experience")}</button>`:`<button class="primary" data-commerce="refresh-order">${icon("pin")} ${t("تحديث حالة الطلب","Refresh status")}</button>`}<a href="/" data-commerce="home">← ${t("العودة إلى المتجر","Back to store")}</a></div>${trustBar()}`;
  }

  async function renderSurvey(token) {
    try{model.survey=await api(`/api/feedback/${encodeURIComponent(token)}`);}catch(error){root.innerHTML=errorCard(error.message);return;}
    if(model.survey.request.status==="submitted"){root.innerHTML=`<div class="survey-success">${icon("check")}<h1>${t("شكرًا لمشاركتك رأيك!","Thank you for your feedback!")}</h1><p>${t("رأيك يساعدنا في تقديم تجربة أفضل.","Your feedback helps us create a better experience.")}</p><a href="/" data-commerce="home">${t("العودة إلى المتجر","Back to store")}</a></div>`;return;}
    const aspects=[["productQuality","جودة المنتجات","Product quality"],["websiteUsability","سهولة استخدام الموقع","Website usability"],["deliverySpeed","سرعة التوصيل","Delivery speed"],["packaging","تغليف الطلب","Packaging"],["customerService","خدمة العملاء","Customer service"],["pricingClarity","وضوح الأسعار","Pricing clarity"],["paymentExperience","سهولة الدفع","Payment experience"]];
    const scores=[[5,"ممتازة","Excellent"],[4,"جيدة","Good"],[3,"متوسطة","Average"],[2,"سيئة","Poor"],[1,"سيئة جدًا","Very poor"]];
    root.innerHTML=`<header class="survey-hero"><div><small>ORIGO EXPERIENCE</small><h1>${t("شاركنا رأيك","Share your feedback")}</h1><p>${t("نحن نعمل باستمرار لنقدم لك تجربة تسوق استثنائية.","We continuously improve your shopping experience.")}</p></div></header>
      <form id="experience-survey" class="survey-layout"><section class="survey-card overall"><h2>1. ${t("كيف تقيم تجربتك بشكل عام؟","How would you rate your overall experience?")}</h2><div class="face-scale">${scores.map(([value,a,e])=>`<label><input type="radio" name="overallScore" value="${value}" required/><span class="face face-${value}"><i></i><i></i><b></b></span><small>${t(a,e)}</small></label>`).join("")}</div></section>
      <section class="survey-card aspects"><h2>2. ${t("يرجى تقييم الجوانب التالية","Please rate the following aspects")}</h2>${aspects.map(([key,a,e])=>`<fieldset><legend>${t(a,e)}</legend><div>${scores.map(([value,sa,se])=>`<label><input type="radio" name="aspect-${key}" value="${value}" ${value===5?"required":""}/><span>${t(sa,se)}</span></label>`).join("")}</div></fieldset>`).join("")}</section>
      <section class="survey-card"><h2>3. ${t("ما الذي أعجبك في تجربتك؟","What did you like?")}</h2><div class="survey-chips">${[["product_quality","جودة المنتجات","Product quality"],["prices","الأسعار","Prices"],["offers","العروض والخصومات","Offers"],["website","سهولة الموقع","Website"],["delivery","سرعة التوصيل","Delivery"],["packaging","التغليف","Packaging"],["support","خدمة العملاء","Support"]].map(([v,a,e])=>`<label><input type="checkbox" name="liked" value="${v}"/><span>${t(a,e)}</span></label>`).join("")}</div></section>
      <section class="survey-card problem"><h2>4. ${t("هل واجهت أي مشكلة؟","Did you experience any issue?")}</h2>${[["none","لم أواجه أي مشكلة","No issue"],["resolved","مشكلة بسيطة وتم حلها","A minor issue was resolved"],["unresolved","واجهت مشكلة ولم تُحل","An issue remains unresolved"],["other","أخرى","Other"]].map(([v,a,e])=>`<label><input type="radio" name="problemState" value="${v}" ${v==="none"?"required":""}/><span>${t(a,e)}</span></label>`).join("")}<div id="problem-details" hidden><select name="problemCategory"><option value="">${t("نوع المشكلة","Issue category")}</option><option value="product">${t("المنتج","Product")}</option><option value="website">${t("الموقع أو التطبيق","Website or app")}</option><option value="delivery">${t("التوصيل والشحن","Delivery")}</option><option value="payment">${t("الدفع","Payment")}</option><option value="support">${t("خدمة العملاء","Support")}</option><option value="packaging">${t("التغليف","Packaging")}</option><option value="order">${t("الطلب","Order")}</option><option value="other">${t("أخرى","Other")}</option></select><textarea name="problemDescription" maxlength="1000" placeholder="${t("صف لنا المشكلة","Describe the issue")}"></textarea></div></section>
      <section class="survey-card"><h2>5. ${t("اقتراحاتك لتحسين تجربتك","Suggestions to improve your experience")}</h2><textarea name="suggestions" maxlength="1000" data-counter="suggestions" placeholder="${t("اكتب اقتراحاتك هنا...","Write your suggestions here...")}"></textarea><small class="counter">0/1000</small></section>
      <section class="survey-card"><h2>6. ${t("هل ترغب في إضافة أي ملاحظات أخرى؟","Any additional notes?")}</h2><textarea name="additionalNotes" maxlength="1000" data-counter="additionalNotes"></textarea><small class="counter">0/1000</small></section>
      <section class="survey-card product-review"><h2>${t("قيّم منتجات طلبك","Rate your products")}</h2>${model.survey.order.items.map(item=>`<article><img src="${esc(item.image||"assets/origo-hero.png")}" alt=""/><div><b>${esc(item.productName)}</b><small>${esc(item.concentration)} ${esc(item.size)}</small><div class="star-rating">${[5,4,3,2,1].map(v=>`<label><input type="radio" name="review-${item.id}" value="${v}"/><span>★</span></label>`).join("")}</div><textarea name="reviewText-${item.id}" maxlength="1000" placeholder="${t("اكتب رأيك في المنتج (اختياري)","Write a product review (optional)")}"></textarea></div></article>`).join("")}</section>
      <button class="primary survey-submit" type="submit">${t("إرسال التقييم","Submit feedback")} ↗</button><p id="survey-error" class="commerce-inline-error"></p></form>${trustBar()}`;
  }

  async function renderInsights() {
    try{model.analytics=(await api("/api/admin/feedback/analytics?periodDays=90")).analytics;}catch(error){root.innerHTML=errorCard(error.message);return;}
    const a=model.analytics;
    root.innerHTML=`<header class="insights-head"><div><small>ORIGO ADMIN · CX ANALYTICS</small><h1>${t("تحليلات تجربة العملاء","Customer experience analytics")}</h1><p>${t(`آخر ${a.periodDays} يومًا`,`Last ${a.periodDays} days`)}</p></div><label>${t("الفترة","Period")}<select id="insights-period"><option value="30">30</option><option value="90" selected>90</option><option value="365">365</option></select></label></header>
      <div class="metric-grid"><article><small>${t("الرضا العام","Overall satisfaction")}</small><b>${a.metrics.overallSatisfaction}%</b></article><article><small>${t("متوسط التقييم","Average rating")}</small><b>${a.averageOverall}/5</b></article><article><small>${t("عدد الردود","Responses")}</small><b>${a.responseCount}</b></article><article><small>${t("معدل الشكاوى","Complaint rate")}</small><b>${a.complaintRate}%</b></article></div>
      <div class="insights-layout"><section class="insights-card"><h2>${t("تقييم الجوانب","Aspect scores")}</h2>${Object.entries(a.metrics).filter(([k])=>k!=="overallSatisfaction").map(([key,value])=>`<div class="metric-bar"><span>${esc(key.replace(/[A-Z]/g,m=>` ${m.toLowerCase()}`))}</span><div><i style="width:${value}%"></i></div><b>${value}%</b></div>`).join("")}</section>
      <section class="insights-card generator"><h2>${t("مولد بطاقة تسويقية","Marketing card generator")}</h2><label>${t("المؤشر","Metric")}<select id="insight-metric"><option value="overall_satisfaction">${t("الرضا العام","Overall satisfaction")}</option><option value="average_rating">${t("متوسط التقييم","Average rating")}</option><option value="product_quality">${t("جودة المنتجات","Product quality")}</option><option value="delivery_speed">${t("سرعة التوصيل","Delivery speed")}</option></select></label><label>${t("القالب","Template")}<select id="insight-template"><option value="story">Instagram Story · 1080×1920</option><option value="post">Instagram Post · 1080×1350</option><option value="square">Square · 1080×1080</option></select></label><div class="social-preview" id="social-preview"></div><div class="export-actions"><button data-commerce="export-insight" data-format="png">PNG</button><button data-commerce="export-insight" data-format="jpeg">JPG</button></div>${a.publishable?`<button class="primary" data-commerce="save-insight">${t("حفظ كمسودة للمراجعة","Save as draft for approval")}</button>`:`<p class="threshold-warning">${t(`لا يمكن نشر الإحصائية قبل الوصول إلى ${a.minimumResponses} ردًا.`,`Publishing is disabled until ${a.minimumResponses} responses are collected.`)}</p>`}</section></div>`;
    drawInsightPreview();
  }
  function drawInsightPreview(exportFormat="") {
    const host=document.querySelector("#social-preview");if(!host||!model.analytics)return;const template=document.querySelector("#insight-template")?.value||"story";const metric=document.querySelector("#insight-metric")?.value||"overall_satisfaction";const dims={story:[1080,1920],post:[1080,1350],square:[1080,1080]}[template];const a=model.analytics;const values={overall_satisfaction:[a.metrics.overallSatisfaction,"رضا العملاء","Customer satisfaction","%"],average_rating:[a.averageOverall,"متوسط تقييمكم","Your average rating","/5"],product_quality:[a.metrics.productQuality,"جودة المنتجات","Product quality","%"],delivery_speed:[a.metrics.deliverySpeed,"سرعة التوصيل","Delivery speed","%"]};const [value,arLabel,enLabel,suffix]=values[metric];
    const canvas=document.createElement("canvas");canvas.width=dims[0];canvas.height=dims[1];const c=canvas.getContext("2d");const g=c.createLinearGradient(0,0,dims[0],dims[1]);g.addColorStop(0,"#22050d");g.addColorStop(.55,"#6e001d");g.addColorStop(1,"#16060a");c.fillStyle=g;c.fillRect(0,0,...dims);c.textAlign="center";c.fillStyle="#d7a84b";c.font=`700 ${dims[0]*.105}px Georgia`;c.fillText("ORIGO",dims[0]/2,dims[1]*.16);c.font=`500 ${dims[0]*.026}px Arial`;c.letterSpacing="10px";c.fillText("S C E N T S",dims[0]/2,dims[1]*.195);c.fillStyle="#fff5e8";c.font=`700 ${dims[0]*.052}px Arial`;c.fillText(ar()?arLabel:enLabel,dims[0]/2,dims[1]*.34);c.strokeStyle="#d7a84b";c.lineWidth=18;c.beginPath();c.arc(dims[0]/2,dims[1]*.53,dims[0]*.22,0,Math.PI*2);c.stroke();c.fillStyle="#fff";c.font=`800 ${dims[0]*.15}px Arial`;c.fillText(`${value}${suffix}`,dims[0]/2,dims[1]*.56);c.font=`400 ${dims[0]*.035}px Arial`;c.fillStyle="#f3d9bd";c.fillText(t(`من ${a.responseCount} تقييمًا حقيقيًا`,`From ${a.responseCount} verified responses`),dims[0]/2,dims[1]*.72);c.fillText(t(`آخر ${a.periodDays} يومًا`,`Last ${a.periodDays} days`),dims[0]/2,dims[1]*.78);host.innerHTML="";host.append(canvas);if(exportFormat){const link=document.createElement("a");link.download=`origo-${metric}-${template}.${exportFormat==="jpeg"?"jpg":"png"}`;link.href=canvas.toDataURL(`image/${exportFormat}`,.94);link.click();}
  }

  async function route() {
    const path=location.pathname;
    if(!/^\/(checkout|order\/|feedback\/|feedback-insights)/.test(path)){setRoute(false);return;}
    setRoute(true);root.innerHTML=`<div class="commerce-loading"><span></span><p>${t("جارٍ تحميل البيانات الآمنة...","Loading secure commerce data...")}</p></div>`;
    try{
      if(path==="/checkout"||path==="/checkout/"){await bootstrap();if(!store.state.cart.length){root.innerHTML=errorCard(t("سلة التسوق فارغة.","Your cart is empty."));return;}await renderCartStage();}
      else if(path.startsWith("/order/"))await renderOrder(decodeURIComponent(path.split("/")[2]||""));
      else if(path.startsWith("/feedback/"))await renderSurvey(decodeURIComponent(path.split("/")[2]||""));
      else if(path.startsWith("/feedback-insights"))await renderInsights();
    }catch(error){root.innerHTML=errorCard(error.message);}
    scrollTo({top:0,behavior:"smooth"});
  }

  document.addEventListener("click",async(event)=>{
    const el=event.target.closest("[data-commerce]");if(!el)return;const action=el.dataset.commerce;
    if(action==="home"){event.preventDefault();history.pushState({},"","/");setRoute(false);window.scrollTo({top:0,behavior:"smooth"});}
    if(action==="qty")await updateCart(el.dataset.id,Number(el.dataset.delta));
    if(action==="clear-cart"){const result=await api("/api/checkout/cart",{method:"POST",body:JSON.stringify({cart:[]})});store.state.cart=result.cart;localStorage.setItem("origoCart","[]");store.renderCart();go("/perfumes");}
    if(action==="save-later"){if(!store.state.wishlist.includes(el.dataset.id))store.state.wishlist.push(el.dataset.id);await updateCart(el.dataset.id,-10);}
    if(action==="apply-coupon"){model.couponCode=document.querySelector("#checkout-coupon").value.trim();try{await renderCartStage();}catch(error){model.couponCode="";store.showToast(error.message);await renderCartStage();}}
    if(action==="next-delivery"){model.stage=2;await renderDeliveryStage();}
    if(action==="copy-order"){await navigator.clipboard.writeText(el.dataset.value);store.showToast(t("تم نسخ رقم الطلب","Order number copied"));}
    if(action==="refresh-order")await renderOrder(model.order.orderNumber);
    if(action==="start-feedback"){const accessToken=localStorage.getItem(accessKey(model.order.orderNumber))||"";try{const result=await api(`/api/checkout/orders/${encodeURIComponent(model.order.orderNumber)}/feedback-request`,{method:"POST",body:JSON.stringify({accessToken})});go(`/feedback/${encodeURIComponent(result.token)}`);}catch(error){store.showToast(error.message);}}
    if(action==="export-insight")drawInsightPreview(el.dataset.format);
    if(action==="save-insight"){const body={periodDays:model.analytics.periodDays,metricKey:document.querySelector("#insight-metric").value,template:document.querySelector("#insight-template").value,channel:"instagram"};try{await api("/api/admin/feedback/insights",{method:"POST",body:JSON.stringify(body)});store.showToast(t("تم حفظ البطاقة كمسودة للمراجعة","Insight saved as draft"));}catch(error){store.showToast(error.message);}}
  });
  document.addEventListener("change",async(event)=>{
    if(event.target.name==="governorateId"){const form=event.target.form;storeAddress(formObject(form));model.address.areaId="";await renderDeliveryStage();}
    if(event.target.name==="paymentMethod"){model.paymentMethod=event.target.value;document.querySelectorAll(".payment-methods label").forEach(l=>l.classList.toggle("selected",l.contains(event.target)));}
    if(event.target.name==="problemState")document.querySelector("#problem-details").hidden=event.target.value==="none";
    if(event.target.id==="insights-period"){model.analytics=(await api(`/api/admin/feedback/analytics?periodDays=${event.target.value}`)).analytics;await renderInsights();}
    if(["insight-metric","insight-template"].includes(event.target.id))drawInsightPreview();
    if(event.target.id==="saved-address"){const saved=model.bootstrap.savedAddresses.find(a=>String(a.id)===event.target.value);if(saved){model.address={...saved};await renderDeliveryStage();}}
  });
  document.addEventListener("input",event=>{if(event.target.matches("[data-counter]")){event.target.nextElementSibling.textContent=`${event.target.value.length}/${event.target.maxLength}`;}});
  document.addEventListener("submit",async(event)=>{
    if(event.target.id==="delivery-form"){event.preventDefault();if(!event.target.reportValidity())return;storeAddress(formObject(event.target));try{await quote();model.stage=3;renderPaymentStage();}catch(error){document.querySelector("#delivery-error").textContent=error.message;}}
    if(event.target.id==="payment-form"){event.preventDefault();if(!event.target.reportValidity())return;model.paymentMethod=new FormData(event.target).get("paymentMethod");await placeOrder(formObject(event.target));}
    if(event.target.id==="experience-survey"){event.preventDefault();if(!event.target.reportValidity())return;const data=new FormData(event.target),aspectScores={};for(const key of ["productQuality","websiteUsability","deliverySpeed","packaging","customerService","pricingClarity","paymentExperience"])aspectScores[key]=Number(data.get(`aspect-${key}`));const productReviews=model.survey.order.items.map(item=>({orderItemId:item.id,rating:Number(data.get(`review-${item.id}`)),text:data.get(`reviewText-${item.id}`)})).filter(review=>review.rating);const body={overallScore:Number(data.get("overallScore")),aspectScores,liked:data.getAll("liked"),problemState:data.get("problemState"),problemCategory:data.get("problemCategory"),problemDescription:data.get("problemDescription"),suggestions:data.get("suggestions"),additionalNotes:data.get("additionalNotes"),productReviews};try{const result=await api(`/api/feedback/${encodeURIComponent(location.pathname.split("/")[2])}`,{method:"POST",body:JSON.stringify(body)});root.innerHTML=`<div class="survey-success">${icon("check")}<h1>${t("شكرًا لمشاركتك رأيك!","Thank you for your feedback!")}</h1><p>${t("رأيك يساعدنا في تقديم تجربة أفضل.","Your feedback helps us create a better experience.")}</p>${result.supportCase?`<div class="support-created">${icon("support")}<b>${t("تم تسجيل ملاحظتك وسيقوم فريق الدعم بمراجعتها.","Your issue was recorded and our support team will review it.")}</b></div>`:""}<a href="/" data-commerce="home">${t("العودة إلى المتجر","Back to store")}</a></div>`;}catch(error){document.querySelector("#survey-error").textContent=error.message;}}
  });
  window.addEventListener("popstate",route);
  document.addEventListener("click",event=>{if(event.target.closest("[data-action='language'],[data-action='theme']")&&document.body.classList.contains("commerce-route"))setTimeout(route,0);});
  window.ORIGOCommerce={openCheckout(){go("/checkout");},route};
  route();
})();
