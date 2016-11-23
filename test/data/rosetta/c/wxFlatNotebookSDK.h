///////////////////////////////////////////////////////////////////////////////
// Name:		wxFlatNotebookSDK.h 
// Purpose:     a class which contains marcos required by wxFlatNotebook 
// Author:      Eran Ifrah <erani.ifrah@gmail.com>
// Created:     30/12/2005
// Modified:    01/01/2006
// Copyright:   Eran Ifrah (c)
// Licence:     wxWindows license <http://www.wxwidgets.org/licence3.txt>
///////////////////////////////////////////////////////////////////////////////

	
#ifdef WXMAKINGDLL_FNB
#    define WXDLLIMPEXP_FNB WXEXPORT
#elif defined(WXUSINGDLL_FNB)
#    define WXDLLIMPEXP_FNB WXIMPORT
#else /* not making nor using FNB as DLL */
#    define WXDLLIMPEXP_FNB
#endif // WXMAKINGDLL_FNB
