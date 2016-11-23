/*====================================================================
* Project:  Board Support Package (BSP)
* Developed using:
* Function: board initialization table (phyCORE-TC1130)
*
* Copyright HighTec EDV-Systeme GmbH 1982-2007
*====================================================================*/

#ifdef PHYCORE_TC1130
#include "phycore_setup.h"
#else
#error ERROR: NO TARGET DEFINED!
#endif /* PHYCORE_TC1130 */


typedef struct
{
	unsigned long addr;
	unsigned long val;
} InitTab_t;

const InitTab_t boardSetupTab[] =
{
	{PLL_CLC_ADDR,		VAL_PLLCLC		},
	{EBU_ADDRSEL0_ADDR,	VAL_EBU_ADDRSEL0},
	{EBU_BUSCON0_ADDR,	VAL_EBU_BUSCON0	},
	{EBU_BUSAP0_ADDR,	VAL_EBU_BUSAP0	},
	{EBU_ADDRSEL1_ADDR,	VAL_EBU_ADDRSEL1},
	{EBU_BUSCON1_ADDR,	VAL_EBU_BUSCON1	},
	{EBU_BUSAP1_ADDR,	VAL_EBU_BUSAP1	},
	{EBU_ADDRSEL2_ADDR,	VAL_EBU_ADDRSEL2},
	{EBU_BUSCON2_ADDR,	VAL_EBU_BUSCON2	},
	{EBU_BUSAP2_ADDR,	VAL_EBU_BUSAP2	},
	{EBU_SDRMCON0_ADDR,	VAL_EBU_SDRMCON0},
	{EBU_SDRMOD0_ADDR,	VAL_EBU_SDRMMOD0},
	{EBU_SDRMREF0_ADDR,	VAL_EBU_SDRMREF0},
	{EBU_SDRMCON1_ADDR,	VAL_EBU_SDRMCON1},
	{EBU_SDRMOD1_ADDR,	VAL_EBU_SDRMMOD1},
	{EBU_SDRMREF1_ADDR,	VAL_EBU_SDRMREF1},
	/*
		This must be done after CSx programming to avoid disabling EBU_CON.CS0FAM
		(CS0 Fills Address Map)
	 */
	{EBU_CON_ADDR,		VAL_EBU_CON		},
	{PMI_CON0_ADDR,		VAL_PMI_CON0	}
};

const unsigned long boardSetupTabSize = sizeof(boardSetupTab) / sizeof(InitTab_t);

