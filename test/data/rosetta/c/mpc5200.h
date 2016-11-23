/*====================================================================
* Project: Board Support Package (BSP)
* Developed using:
* Function: register description for Freescale MPC5200
*
* Copyright HighTec EDV-Systeme GmbH 1982-2006
*====================================================================*/

#ifndef __MPC5200_H__
#define __MPC5200_H__


/* general register definition macro */
#define __REG32(x)	((volatile unsigned int *)(x))
#define __REG16(x)	((volatile unsigned short *)(x))
#define __REG8(x)	((volatile unsigned char *)(x))

/* Reset value is 0x80000000; pcm030.cfg maps MBAR to this new address */
#define MBAR_BASE	0xF0000000

/* Internal Register Memory Map */
#define MM_BASE		(MBAR_BASE + 0x0000)	/* Memory Map Registers */
#define SDRAM_BASE	(MBAR_BASE + 0x0100)	/* SDRAM Memory Controller Registers */
#define CDM_BASE	(MBAR_BASE + 0x0200)	/* Clock Distribution Module Registers */
#define CSC_BASE	(MBAR_BASE + 0x0300)	/* Chip Select Controller Registers */
#define ICTL_BASE	(MBAR_BASE + 0x0500)	/* Interrupt Controller Registers */
#define GPT_BASE	(MBAR_BASE + 0x0600)	/* General Purpose Timer Registers */
#define SLT_BASE	(MBAR_BASE + 0x0700)	/* Slice Time Registers */
#define RTC_BASE	(MBAR_BASE + 0x0800)	/* Real-Time Clock Registers */
#define CAN_BASE	(MBAR_BASE + 0x0900)	/* MSCAN Registers */
#define GPS_BASE	(MBAR_BASE + 0x0B00)	/* GPIO Standard Registers */
#define GPW_BASE	(MBAR_BASE + 0x0C00)	/* GPIO Wakeup Registers */
#define PCI_BASE	(MBAR_BASE + 0x0D00)	/* PCI XLB Registers */
#define SPI_BASE	(MBAR_BASE + 0x0F00)	/* Serial Peripheral Interface Registers */
#define USB_BASE	(MBAR_BASE + 0x1000)	/* Universal Serial Bus Registers */
#define BDMA_BASE	(MBAR_BASE + 0x1200)	/* BestComm DMA Registers */
#define BDLC_BASE	(MBAR_BASE + 0x1300)	/* J1850 (BDLC) Registers */
#define XLARB_BASE	(MBAR_BASE + 0x1F00)	/* XL BUS ARBITRATION Registers */
#define PSC1_BASE	(MBAR_BASE + 0x2000)	/* Programmable Serial Controller 1 Registers */
#define PSC2_BASE	(MBAR_BASE + 0x2200)	/* Programmable Serial Controller 2 Registers */
#define PSC3_BASE	(MBAR_BASE + 0x2400)	/* Programmable Serial Controller 3 Registers */
#define PSC4_BASE	(MBAR_BASE + 0x2600)	/* Programmable Serial Controller 4 Registers */
#define PSC5_BASE	(MBAR_BASE + 0x2800)	/* Programmable Serial Controller 5 Registers */
#define PSC6_BASE	(MBAR_BASE + 0x2C00)	/* Programmable Serial Controller 6 Registers */
#define ETH_BASE	(MBAR_BASE + 0x3000)	/* Ethernet Registers */
#define BPCI_BASE	(MBAR_BASE + 0x3800)	/* BestComm DMA PCI Registers */
#define ATA_BASE	(MBAR_BASE + 0x3A00)	/* Advanced Technology Attachment Registers */
#define BLPC_BASE	(MBAR_BASE + 0x3C00)	/* BestComm DMA LocalPlus Registers */
#define IIC_BASE	(MBAR_BASE + 0x3D00)	/* Inter-Integrated Circuit Registers */

#define SRAM_BASE	(MBAR_BASE + 0x8000)	/* On-chip Static RAM Memory Locations */
#define SRAM_SIZE	0x4000			/* On-chip Static RAM Memory size  */


/* Clock Distribution Module Register */
#define CDM_JTAGID		__REG32(CDM_BASE + 0x0000)	/* JTAG ID Number Register (RO) */
#define CDM_PORCFG		__REG32(CDM_BASE + 0x0004)	/* Power On Reset Configuration Register */
#define CDM_CFG			__REG32(CDM_BASE + 0x000C)	/* Configuration Register */
#define CDM_48_FDC		__REG32(CDM_BASE + 0x0010)	/* 48MHz Fractional Divider Configuration Register */
#define CDM_CER			__REG32(CDM_BASE + 0x0014)	/* Clock Enable Register */
#define CDM_SRESET		__REG32(CDM_BASE + 0x0020)	/* Soft Reset Register */


/* Interrupt Controller Register  (see mpc52xx_irq.h) */



/* Slice Timers */
#define SLT0_TCR		__REG32(SLT_BASE + 0x0000)	/* Timer 0 Terminal Count Register */
#define SLT0_CR			__REG32(SLT_BASE + 0x0004)	/* Timer 0 Control Register */
#define SLT0_CVR		__REG32(SLT_BASE + 0x0008)	/* Timer 0 Count Value Register (RO) */
#define SLT0_TSR		__REG32(SLT_BASE + 0x000C)	/* Timer 0 Timer Status Register */
#define SLT1_TCR		__REG32(SLT_BASE + 0x0010)	/* Timer 1 Terminal Count Register */
#define SLT1_CR			__REG32(SLT_BASE + 0x0014)	/* Timer 1 Control Register */
#define SLT1_CVR		__REG32(SLT_BASE + 0x0018)	/* Timer 1 Count Value Register (RO) */
#define SLT1_TSR		__REG32(SLT_BASE + 0x001C)	/* Timer 1 Timer Status Register */

/* bits in Control Register */
#define SLT_CR_TE	(1u << (31-7))	/* Timer Enable */
#define SLT_CR_IE	(1u << (31-6))	/* Interrupt Enable */
#define SLT_CR_RW	(1u << (31-5))	/* Run_Wait (1=Run,0=Wait) */

/* bits in Timer Status Register (only SLT1) */
#define SLT1_TSR_ST	(1u << (31-7))	/* Status Timer: 1 = Terminal Count reached; write to clear interrupt */


/* GPIO Standard Registers */
#define GPIO_GPS_PCR	__REG32(GPS_BASE + 0x00)	/* Port Configuration Register */

/* GPIO Wakeup Registers */
#define GPIO_WKUP_ER	__REG8(GPW_BASE + 0x00)	/* GPIO WakeUp Enable Register */
#define GPIO_WKUP_ODE	__REG8(GPW_BASE + 0x04)	/* GPIO WakeUp Open Drain Emulation Register */
#define GPIO_WKUP_DDR	__REG8(GPW_BASE + 0x08)	/* GPIO WakeUp Data Direction Register */
#define GPIO_WKUP_DVOR	__REG8(GPW_BASE + 0x0C)	/* GPIO WakeUp Data Value Out Register */



#endif /* __MPC5200_H__ */
