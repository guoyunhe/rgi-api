import axios from 'axios';
import FormData from 'form-data';

/**
 * To get systemId:
 * 1. Go to https://datomatic.no-intro.org/index.php?page=download&op=xml
 * 2. Choose system you want to download
 * 3. Check `s=xx` parameter in browser's address bar
 */
async function downloadDat(systemId: number) {
  // Send system id to get download id
  const formData = new FormData();
  formData.append('system_selection', String(systemId));
  formData.append('sys_list_order', '2');
  formData.append('naming', '0');
  formData.append('numbered', '0');
  formData.append('hash', '1');
  formData.append('fill_parents', '1');
  formData.append('hdl_xml_', 'Prepare');
  const res1 = await axios.post(
    `https://datomatic.no-intro.org/index.php?page=download&op=xml&s=${systemId}`,
    formData,
    {
      maxRedirects: 0, // disable redirect
      validateStatus: function (status) {
        return status < 500; // accept 302
      },
    }
  );
  console.log(res1.statusText);
}

export default async function importNoIntroDat(platform: string, systemId: number) {
  await downloadDat(systemId);
}
