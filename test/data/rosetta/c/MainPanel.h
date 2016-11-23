///////////////////////////////////////////////////////////////////////////
// C++ code generated with wxFormBuilder (version Dec 17 2007)
// http://www.wxformbuilder.org/
//
// PLEASE DO "NOT" EDIT THIS FILE!
///////////////////////////////////////////////////////////////////////////

#ifndef __noname__
#define __noname__

#include <wx/sizer.h>
#include <wx/gdicmn.h>
#include <wx/panel.h>
#include <wx/font.h>
#include <wx/colour.h>
#include <wx/settings.h>
#include <wx/string.h>
#include <wx/splitter.h>

///////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////
/// Class MainPanel
///////////////////////////////////////////////////////////////////////////////
class MainPanel : public wxPanel
{
	private:

	public:
		MainPanel( wxWindow* parent, wxWindowID id = wxID_ANY, const wxPoint& pos = wxDefaultPosition, const wxSize& size = wxSize( 500,300 ), long style = wxTAB_TRAVERSAL );
		~MainPanel();
		void SplitterWindowOnIdle( wxIdleEvent& )
		{
            m_pSplitterWindow->SetSashPosition( 0 );
            m_pSplitterWindow->Disconnect( wxEVT_IDLE, wxIdleEventHandler( MainPanel::SplitterWindowOnIdle ), NULL, this );
		}

		wxSplitterWindow*   m_pSplitterWindow;
		wxPanel*            m_pSearchPanel;
		wxPanel*            m_pNotebkPanel;
        wxBoxSizer*         m_pMainSizer;
        wxBoxSizer*         m_pSearchSizer;
        wxBoxSizer*         m_pNotebkSizer;

};

#endif //__noname__
