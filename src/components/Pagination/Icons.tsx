import { createIcon } from "@chakra-ui/react"

const ArrowRight = createIcon({
    viewBox: "0 0 14 26",
    path: (
      <path 
        d="M0.535359 0.5723C0.192569 0.938854 0 1.43594 0 1.95425C0 2.47256 0.192569 2.96964 0.535359 3.3362L9.5864 13.0118L0.535359 22.6874C0.202284 23.0561 0.0179809 23.5498 0.022147 24.0623C0.0263131 24.5748 0.218614 25.0651 0.557632 25.4275C0.89665 25.7899 1.35526 25.9955 1.83468 25.9999C2.31411 26.0044 2.77599 25.8074 3.12085 25.4513L13.4646 14.3937C13.8074 14.0272 14 13.5301 14 13.0118C14 12.4935 13.8074 11.9964 13.4646 11.6299L3.12085 0.5723C2.77796 0.205857 2.31295 0 1.8281 0C1.34325 0 0.878252 0.205857 0.535359 0.5723V0.5723Z" 
        fill="#888888" 
      />
      )
  })
  const ArrowLeft = createIcon({
    viewBox: "0 0 14 26",
    path: (
      <path d="M13.4646 25.4277C13.8074 25.0611 14 24.5641 14 24.0458C14 23.5274 13.8074 23.0304 13.4646 22.6638L4.4136 12.9882L13.4646 3.3126C13.7977 2.94394 13.982 2.45019 13.9779 1.93768C13.9737 1.42517 13.7814 0.934919 13.4424 0.572508C13.1034 0.210096 12.6447 0.00452849 12.1653 7.49363e-05C11.6859 -0.00437861 11.224 0.192641 10.8792 0.548699L0.535359 11.6063C0.192569 11.9728 2.04742e-07 12.4699 2.04742e-07 12.9882C2.04742e-07 13.5065 0.192569 14.0036 0.535359 14.3701L10.8792 25.4277C11.222 25.7941 11.687 26 12.1719 26C12.6567 26 13.1217 25.7941 13.4646 25.4277V25.4277Z" 
      fill="#888888"/>
      )
  })
  const ButtonBack = createIcon({
    viewBox: "0 0 58 58",
    defaultProps: {
       width:"58" , height:"58",  fill:"none", 
    },
    path: (
      <path d="M34.5411 42.3617C34.8349 41.9528 35 41.3984 35 40.8203C35 40.2421 34.8349 39.6877 34.5411 39.2789L26.7831 28.4868L34.5411 17.6948C34.8266 17.2836 34.9846 16.7329 34.981 16.1613C34.9774 15.5896 34.8126 15.0428 34.522 14.6386C34.2314 14.2343 33.8383 14.005 33.4274 14.0001C33.0165 13.9951 32.6206 14.2149 32.325 14.612L23.4589 26.9454C23.1651 27.3543 23 27.9087 23 28.4868C23 29.0649 23.1651 29.6194 23.4589 30.0282L32.325 42.3617C32.6189 42.7704 33.0175 43 33.4331 43C33.8486 43 34.2472 42.7704 34.5411 42.3617V42.3617Z" 
      fill="#CF2B2B"/>
      )
  })

  export {ArrowLeft, ArrowRight, ButtonBack}
  