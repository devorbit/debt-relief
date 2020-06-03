package com.experian.debtrelief.model

case class TradeAccountData(pin: Long = 0, accountNB : Long = 0,acctSTATUSCD: String ="", acctOpenDT : String = "",acctTypeCD: String = "",acctBalanceAm: Long= 0, acctPaymentAmount : Long = 0, subscriberId : String = "",subscriberName: String = "",enhancedSpclCmntCD : String = "",termsFreq : String = "",terms: Int =0)
