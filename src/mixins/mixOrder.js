//Order status
const OrderStatusMap = [
  {
    value: 1,
    name: 'Pending payment'
  },
  {
    value: 2,
    name: 'To be delivered'
  },
  {
    value: 3,
    name: 'Delivery failed'
  },
  {
    value: 4,
    name: 'Pending order'
  },
  {
    value: 5,
    name: 'To be out of the library'
  },
  {
    value: 6,
    name: 'To be received'
  },
  {
    value: 7,
    name: 'Completed'
  },
  {
    value: 8,
    name: 'Cancelled'
  }
]
const AfterOrderStatusMap = [
  {
    value: 1,
    name: 'Pending disposal'
  },
  {
    value: 2,
    name: 'Delivery failed'
  },
  {
    value: 3,
    name: 'Pending order'
  },
  {
    value: 4,
    name: 'To be out of the library'
  },
  {
    value: 5,
    name: 'To be received'
  },
  {
    value: 6,
    name: 'Completed'
  },
  {
    value: 7,
    name: 'Cancelled'
  }
]

//Payment status
const PayStatusMap = [
  {
    value: 1,
    name: 'unpaid'
  },
  {
    value: 2,
    name: 'Paid'
  },
  {
    value: 3,
    name: 'Partial payment'
  }
]
export default {
  data() {
    return {
      searchTypes: [
        {
          name: 'Order number',
          value: 'thirdPartyOrderNo'
        },
        {
          name: 'Receiver',
          value: 'receiver'
        },
        {
          name: 'Logistics channels',
          value: 'logisticsChannel'
        },
        {
          name: 'Country',
          value: 'country'
        },
        {
          name: 'Tracking Number',
          value: 'logisticsNo'
        },
        {
          name: 'Parcel number',
          value: 'orderNo'
        },
        //  {
        //     name:'全部',
        //     value:'all'
        // }
      ],
      payStatusMap: PayStatusMap,
      orderStatusMap: OrderStatusMap,
      afterOrderStatusMap: AfterOrderStatusMap
    }
  },
  filters: {
    getOrderStatusStr(value) {

      let order = OrderStatusMap.find(ele => ele.value === value);
      return order ? order.name : 'Pending payment'

    },
    getAfterOrderStatusStr(value) {

      let order = AfterOrderStatusMap.find(ele => ele.value === value);
      return order ? order.name : 'Pending payment'

    },
    getPayStatusStr(value) {

      let pay = PayStatusMap.find(ele => ele.value === value);
      return pay ? pay.name : 'unpaid';

    },
  },
  methods: {
    async calculateOrderCostsBatch(orderIds) {

      let data = await this.$axios.get('/retailer-api/orders/calculateOrderCostsBatch', { params: { orderIds } });
      return data;

    },
    //跳转到详情
    jumpDetail(id,type){

      this.$router.push({
        name: 'order-detail',
        params: { id },
        query: { type }
      });

    },
  }
}