#ifndef BROWSETRACKERLAYOUT_H
#define BROWSETRACKERLAYOUT_H


#include <wx/string.h>
#include "projectfile.h"

#include "BrowseTrackerDefs.h"

class cbProject;

// ----------------------------------------------------------------------------
class BrowseTrackerLayout
// ----------------------------------------------------------------------------
{
	public:
		BrowseTrackerLayout(cbProject* project);
		virtual ~BrowseTrackerLayout();

        bool Open(const wxString& filename, FileBrowse_MarksHash& m_EdBrowse_MarksArchive, FileBrowse_MarksHash& m_EdBook_MarksArchive );
        bool Save(const wxString& filename, FileBrowse_MarksHash& m_EdBrowse_MarksArchive, FileBrowse_MarksHash& m_EdBook_MarksArchive);

        ProjectFile* GetTopProjectFile(){ return m_TopProjectFile; }
        bool ParseBrowse_MarksString(const wxString& filename, wxString BrowseMarksString, FileBrowse_MarksHash& m_EdBrowse_MarksArchive);
        void DumpBrowse_Marks( const wxString hashType, FileBrowse_MarksHash& m_FileBrowse_MarksArchive, FileBrowse_MarksHash& m_FileBook_MarksArchive );

	protected:
	private:
        cbProject*      m_pProject;
        ProjectFile*    m_TopProjectFile;
};

#endif // BROWSETRACKERLAYOUT_H
