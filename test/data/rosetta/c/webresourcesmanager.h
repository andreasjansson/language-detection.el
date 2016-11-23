#ifndef WEBRESOURCESMANAGER_H
#define WEBRESOURCESMANAGER_H

#include <wx/hashmap.h>
#include <wx/arrstr.h>
#include <vector>

/** \brief Class managing web resources */
class WebResourcesManager
{
    public:

        /** \brief Class which does handle progress notifying operations */
        class ProgressHandler
        {
            public:

                /** \brief Values of predefined ids */
                enum PredefinedIds
                {
                    idDownloadList = -1,
                    idDownloadConfig = -2
                };

                virtual ~ProgressHandler() {}

                /** \brief Notifying that new downlaod has been started
                 *  \return Some identifier that will be passed into other handler functions
                 */
                virtual int StartDownloading( const wxString& Url ) = 0;


                /** \brief Get progress change information, note if progres < 0, progress can not be calculated */
                virtual void SetProgress( float progress, int id ) = 0;

                /** \brief Notifying that job has been finished */
                virtual void JobFinished( int id ) = 0;

                /** \brief Notify about some error */
                virtual void Error( const wxString& info, int id ) = 0;
        };

        /** \brief Ctor */
        WebResourcesManager();

        /** \brief Dctor */
        ~WebResourcesManager();

        /** \brief Load list of detection configurations from given list of base urls */
        bool LoadDetectionConfigurations( const wxArrayString& baseUrls, ProgressHandler* handler = 0 );

        /** \brief Try to download library detection settings with given shortcode */
        bool LoadDetectionConfig( const wxString& shortcut, std::vector< char >& content, ProgressHandler* handler = 0 );


    private:

        struct DetectConfigurationEntry
        {
            wxString m_Url;                     ///< \brief Url to resource with configuration file
            wxString m_Sign;                    ///< \brief Digital sign for the resource file (may be empty)
            DetectConfigurationEntry* m_Next;   ///< \brief Next configuration in the chain
        };

        WX_DECLARE_STRING_HASH_MAP( DetectConfigurationEntry*, EntriesT );

        EntriesT m_Entries;

        void ClearEntries();

        bool DoDownload( const wxString& url, ProgressHandler* handler, std::vector< char >& arr );
};

#endif
